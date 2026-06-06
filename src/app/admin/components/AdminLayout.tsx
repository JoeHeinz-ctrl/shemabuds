import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOutUser } from "../../../services/authService";
import { Heart, LayoutDashboard, Package, ShoppingCart, LogOut, Menu, X, Tag } from "lucide-react";
import { Button } from "../../components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOutUser();
    navigate("/admin/login");
  };

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/products", label: "Products", icon: Package },
    { path: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { path: "/admin/categories", label: "Categories", icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#A67C52]/15 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/admin" className="flex items-center gap-2">
              <div className="bg-[#A67C52] p-2 rounded-xl shadow-sm">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <span className="text-lg text-[#2A1B14] font-semibold">Shemabuds</span>
                <span className="text-xs text-[#6B5D52] ml-2">Admin</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-[#A67C52] text-white"
                        : "text-[#4A3A32] hover:bg-[#A67C52]/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="hidden md:flex items-center gap-2 border-[#A67C52] text-[#A67C52] hover:bg-[#A67C52]/10"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#4A3A32]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-[#A67C52]/15">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#A67C52] text-white"
                          : "text-[#4A3A32] hover:bg-[#A67C52]/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-[#4A3A32] hover:bg-[#A67C52]/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
