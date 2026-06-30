import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Badge } from "antd";
import {
  FaUtensils,
  FaShoppingCart,
  FaUserShield,
  FaSignOutAlt,
  FaHome,
  FaClipboardList,
} from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { logoutUser } from "../../api/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Destructure setIsCartOpen from context to toggle the drawer
  const { totalItems, setIsCartOpen } = useCart();
  const token = localStorage.getItem("token");

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Error during server logout routing:", err);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const linkStyle = (path) => {
    const isCurrent = location.pathname === path;
    return `
      relative flex items-center gap-2 py-2 text-sm font-bold tracking-wide transition-all duration-300
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-orange-500 
      after:transform after:origin-left after:transition-transform after:duration-300
      ${isCurrent
        ? "text-orange-500 after:scale-x-100"
        : "text-slate-600 hover:text-orange-500 after:scale-x-0 hover:after:scale-x-100"
      }
    `;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">

        {/* Brand Logo Identity */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-black tracking-tight bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent hover:opacity-90 transition-opacity"
        >
          <FaUtensils className="text-orange-500 text-lg sm:text-xl" />
          <span>Smart Restaurant</span>
        </Link>

        {/* Primary Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          <Link className={linkStyle("/")} to="/">
            <FaHome className="text-base" />
            <span>Home</span>
          </Link>

          <Link className={linkStyle("/menu")} to="/menu">
            <FaUtensils className="text-xs" />
            <span>Menu</span>
          </Link>

          {token && (
            <Link className={linkStyle("/dashboard")} to="/dashboard">
              <FaClipboardList className="text-base" />
              <span>Dashboard</span>
            </Link>
          )}
        </nav>

        {/* Global Action Button Group Layout */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Shopper Bag Badge Trigger */}
          <Badge
            count={totalItems}
            offset={[-2, 2]}
            style={{ backgroundColor: '#f97316', boxShadow: '0 0 0 2px #fff' }}
          >
            <Button
              shape="circle"
              size="large"
              className="flex items-center justify-center border-slate-200 text-slate-600 hover:text-orange-500 hover:border-orange-200 bg-white"
              icon={<FaShoppingCart className="text-sm sm:text-base" />}
              onClick={() => setIsCartOpen(true)} // FIXED: Triggers the shared global Cart Drawer instead of navigating
            />
          </Badge>

          {/* Secure Partition Divider */}
          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          {/* Authenticated Sessions Workflow */}
          {!token ? (
            <div className="flex items-center gap-2">
              <Button
                type="text"
                className="font-semibold text-slate-600 hover:text-orange-500 flex items-center gap-1.5 px-2.5 sm:px-4"
                icon={<FaUserShield className="text-slate-400" />}
                onClick={() => navigate("/login")}
              >
                <span className="hidden sm:inline">Sign In</span>
              </Button>

              <Button
                type="primary"
                className="font-bold tracking-wide rounded-xl shadow-md shadow-orange-500/10 hover:scale-[1.02] active:scale-95 transition-all"
                style={{ backgroundColor: '#f97316', borderColor: '#f97316', height: '38px' }}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          ) : (
            <Button
              danger
              type="ghost"
              className="font-semibold rounded-xl flex items-center gap-2 border-red-200 hover:bg-red-50"
              style={{ height: '38px' }}
              icon={<FaSignOutAlt className="text-xs" />}
              onClick={logout}
            >
              <span className="hidden sm:inline">Log Out</span>
            </Button>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;