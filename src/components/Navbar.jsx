import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { FaUtensils } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow flex justify-between items-center px-6 py-4">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl">
        <FaUtensils /> Smart Restaurant
      </Link>
      <div className="flex gap-3">
        {token ? (
          <>
            <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button danger onClick={logout}>Logout</Button>
          </>
        ) : (
          <Button type="primary" onClick={() => navigate("/login")}>Kitchen Login</Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
