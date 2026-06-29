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

    const { totalItems } = useCart();

    const token = localStorage.getItem("token");

    const logout = async () => {
        try {
            await logoutUser(); // optional backend call
        } catch (err) {
            console.log(err);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    const isActive = (path) =>
        location.pathname === path
            ? "text-orange-500 font-semibold"
            : "text-gray-700 hover:text-orange-500";

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-2xl font-bold text-orange-500"
                >
                    <FaUtensils />
                    Smart Restaurant
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">

                    <Link className={isActive("/")} to="/">
                        <FaHome className="inline mr-2" />
                        Home
                    </Link>

                    <Link className={isActive("/menu")} to="/menu">
                        Menu
                    </Link>

                    {token && (
                        <Link className={isActive("/dashboard")} to="/dashboard">
                            <FaClipboardList className="inline mr-2" />
                            Dashboard
                        </Link>
                    )}
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    {/* Cart */}
                    <Badge count={totalItems}>
                        <Button
                            shape="circle"
                            icon={<FaShoppingCart />}
                            onClick={() => navigate("/menu")}
                        />
                    </Badge>

                    {/* AUTH BUTTONS */}
                    {!token ? (
                        <>
                            <Button
                                icon={<FaUserShield />}
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </Button>

                            <Button
                                type="primary"
                                onClick={() => navigate("/register")}
                            >
                                Register
                            </Button>
                        </>
                    ) : (
                        <Button
                            danger
                            icon={<FaSignOutAlt />}
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;