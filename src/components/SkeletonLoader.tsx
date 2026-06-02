import { motion } from "motion/react";

export function ProductCardSkeleton() {
  return (
    <div className="glass-strong rounded-2xl overflow-hidden shadow-luxury">
      <div className="relative aspect-square md:aspect-[4/3] bg-muted animate-pulse">
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="p-3 md:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
          <div className="h-6 w-16 bg-muted rounded animate-pulse" />
        </div>
        <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
        <div className="hidden md:block h-4 w-full bg-muted rounded animate-pulse" />
        <div className="hidden md:block h-4 w-2/3 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}

export function ReviewCardSkeleton() {
  return (
    <div className="glass-strong rounded-2xl p-6 shadow-luxury">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          <div className="h-3 w-24 bg-muted rounded animate-pulse" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}

export function OfferCardSkeleton() {
  return (
    <div className="glass-strong rounded-2xl overflow-hidden shadow-luxury">
      <div className="relative aspect-[16/9] bg-muted animate-pulse">
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
        <div className="h-9 w-full bg-muted rounded-lg animate-pulse mt-4" />
      </div>
    </div>
  );
}

export function CollectionCardSkeleton() {
  return (
    <div className="glass-strong rounded-2xl overflow-hidden shadow-luxury">
      <div className="relative aspect-square bg-muted animate-pulse">
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="p-4 space-y-2">
        <div className="h-5 w-2/3 bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}
