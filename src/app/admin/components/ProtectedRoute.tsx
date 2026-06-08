import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthChange } from "../../../services/authService";
import { User } from "firebase/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
      
      // Admin email whitelist
      const ADMIN_EMAILS = [
        import.meta.env.VITE_ADMIN_EMAIL || "admin@shemabuds.com"
      ];
      
      // Check if user email is in whitelist
      if (currentUser && currentUser.email) {
        const isAdmin = ADMIN_EMAILS.includes(currentUser.email.toLowerCase().trim());
        setIsAuthorized(isAdmin);
      } else {
        setIsAuthorized(false);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#A67C52] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4A3A32]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAuthorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
