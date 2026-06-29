import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import KitchenDashboard from "./pages/KitchenDashboard";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>

        {/* ALWAYS VISIBLE */}
        <Navbar />

        {/* PAGE CONTENT */}
        <div className="min-h-[80vh]">
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/order/:id" element={<OrderTracking />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <KitchenDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />

          </Routes>
        </div>

        {/* ALWAYS VISIBLE */}
        <Footer />

      </BrowserRouter>
    </CartProvider>
  );
};

export default App;