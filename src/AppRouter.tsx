import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy load main app and admin components for better performance
const App = lazy(() => import("./app/App"));
const ProtectedRoute = lazy(() => import("./app/admin/components/ProtectedRoute").then(m => ({ default: m.ProtectedRoute })));
const Login = lazy(() => import("./app/admin/pages/Login").then(m => ({ default: m.Login })));
const Dashboard = lazy(() => import("./app/admin/pages/Dashboard").then(m => ({ default: m.Dashboard })));
const Products = lazy(() => import("./app/admin/pages/Products").then(m => ({ default: m.Products })));
const Orders = lazy(() => import("./app/admin/pages/Orders").then(m => ({ default: m.Orders })));
const Featured = lazy(() => import("./app/admin/pages/Featured").then(m => ({ default: m.Featured })));
const Categories = lazy(() => import("./app/admin/pages/Categories").then(m => ({ default: m.Categories })));

export function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#FAF7F2", color: "#A67C52", fontSize: "1.2rem" }}>Loading…</div>}>
        <Routes>
          {/* Main Website */}
          <Route path="/" element={<App />} />

          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/admin/featured" element={<ProtectedRoute><Featured /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />

          {/* Redirect unknown admin routes to dashboard */}
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />

          {/* Redirect all other routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}