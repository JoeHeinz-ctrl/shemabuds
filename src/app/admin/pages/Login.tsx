import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../../services/authService";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Heart } from "lucide-react";
import { rateLimiter, RATE_LIMITS } from "../../../utils/rateLimiter";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Rate limiting check
    const rateLimitKey = `admin-auth:${email}`;
    const rateCheck = rateLimiter.check(rateLimitKey, RATE_LIMITS.AUTH_ATTEMPT);
    
    if (!rateCheck.allowed) {
      setError(`Too many login attempts. Please wait ${rateCheck.resetIn} seconds before trying again.`);
      setLoading(false);
      return;
    }

    // Admin email whitelist - only these emails can access admin
    const ADMIN_EMAILS = [
      import.meta.env.VITE_ADMIN_EMAIL || "admin@shemabuds.com"
    ];

    // Check if email is authorized
    if (!ADMIN_EMAILS.includes(email.toLowerCase().trim())) {
      setError("Unauthorized: This email is not authorized for admin access.");
      setLoading(false);
      return;
    }

    try {
      const user = await signIn(email, password);
      
      // Double-check email after sign in
      if (user && ADMIN_EMAILS.includes(user.email?.toLowerCase().trim() || "")) {
        // Reset rate limit on successful login
        rateLimiter.reset(rateLimitKey);
        navigate("/admin");
      } else {
        setError("Unauthorized: This account does not have admin privileges.");
      }
    } catch (err: any) {
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setError("Invalid email or password");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError(err.message || "Failed to sign in");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f2e7cb] to-[#d0d488] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-8">
            <img 
              src="/Brand/logo.png" 
              alt="Shemabuds" 
              className="h-20 mb-2"
            />
            <p className="text-sm text-[#6B5D52]">Admin Dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-[#2A1B14] font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shemabuds.com"
                className="mt-2 bg-[#FEFDFB] border-[#94b38a]/30 focus:border-[#94b38a]"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#2A1B14] font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-2 bg-[#FEFDFB] border-[#94b38a]/30 focus:border-[#94b38a]"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d47448] hover:bg-[#b85f3a] text-white py-6 shadow-[0_4px_14px_rgba(212,116,72,0.25)] transition-all duration-300 font-medium"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
