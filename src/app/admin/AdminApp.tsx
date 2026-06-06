// AdminApp is kept as a thin re-export shim.
// All routing is handled by AppRouter.tsx (BrowserRouter lives there).
// This file is only used by the legacy admin.tsx entry point.
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { Orders } from "./pages/Orders";
import { Featured } from "./pages/Featured";
import { Categories } from "./pages/Categories";
import { Suspense } from "react";

export function AdminApp() {
  return (
    <Router>
      <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#FAF7F2", color: "#A67C52" }}>Loading…</div>}>
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/admin/featured" element={<ProtectedRoute><Featured /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}