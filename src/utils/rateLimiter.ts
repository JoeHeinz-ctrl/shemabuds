/**
 * Simple client-side rate limiter
 * Prevents abuse by limiting actions per time window
 */

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
}

interface RateLimitRecord {
  attempts: number[];
  blockedUntil?: number;
}

class RateLimiter {
  private records: Map<string, RateLimitRecord> = new Map();

  /**
   * Check if an action is allowed
   * @param key - Unique identifier (e.g., 'order:userId', 'contact:email')
   * @param config - Rate limit configuration
   * @returns Object with allowed status and remaining attempts
   */
  check(key: string, config: RateLimitConfig): { allowed: boolean; remaining: number; resetIn?: number } {
    const now = Date.now();
    const record = this.records.get(key) || { attempts: [] };

    // Check if currently blocked
    if (record.blockedUntil && now < record.blockedUntil) {
      return {
        allowed: false,
        remaining: 0,
        resetIn: Math.ceil((record.blockedUntil - now) / 1000)
      };
    }

    // Remove attempts outside the time window
    record.attempts = record.attempts.filter(
      (timestamp) => now - timestamp < config.windowMs
    );

    // Check if limit exceeded
    if (record.attempts.length >= config.maxAttempts) {
      // Set block duration if configured
      if (config.blockDurationMs) {
        record.blockedUntil = now + config.blockDurationMs;
        this.records.set(key, record);
        return {
          allowed: false,
          remaining: 0,
          resetIn: Math.ceil(config.blockDurationMs / 1000)
        };
      }

      return {
        allowed: false,
        remaining: 0,
        resetIn: Math.ceil(config.windowMs / 1000)
      };
    }

    // Add current attempt
    record.attempts.push(now);
    this.records.set(key, record);

    return {
      allowed: true,
      remaining: config.maxAttempts - record.attempts.length
    };
  }

  /**
   * Reset rate limit for a key
   */
  reset(key: string): void {
    this.records.delete(key);
  }

  /**
   * Clear all rate limit records
   */
  clearAll(): void {
    this.records.clear();
  }

  /**
   * Clean up old records (call periodically)
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.records.entries()) {
      // Remove if all attempts are old and not blocked
      if (
        (!record.blockedUntil || now > record.blockedUntil) &&
        record.attempts.every((timestamp) => now - timestamp > 3600000) // 1 hour
      ) {
        this.records.delete(key);
      }
    }
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

// Rate limit configurations
export const RATE_LIMITS = {
  ORDER_PLACEMENT: {
    maxAttempts: 5,
    windowMs: 60000, // 1 minute
    blockDurationMs: 300000, // 5 minutes if exceeded
  },
  CONTACT_FORM: {
    maxAttempts: 3,
    windowMs: 300000, // 5 minutes
    blockDurationMs: 600000, // 10 minutes if exceeded
  },
  AUTH_ATTEMPT: {
    maxAttempts: 5,
    windowMs: 300000, // 5 minutes
    blockDurationMs: 900000, // 15 minutes if exceeded
  },
  CART_UPDATE: {
    maxAttempts: 30,
    windowMs: 60000, // 1 minute
  },
  PRODUCT_VIEW: {
    maxAttempts: 100,
    windowMs: 60000, // 1 minute
  },
};

// Cleanup old records every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    rateLimiter.cleanup();
  }, 600000);
}
