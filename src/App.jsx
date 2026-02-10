import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import KitchenDashboard from "./pages/KitchenDashboard";
import OrderTracking from "./pages/OrderTracking";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";

const App = () => (
  <CartProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order/:id" element={<OrderTracking />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <KitchenDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  </CartProvider>
);

export default App;
