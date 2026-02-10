import { useEffect, useState, useContext } from "react";
import API from "../api/api";
import MenuCard from "../components/MenuCard";
import CartDrawer from "../components/CartDrawer";
import { CartContext } from "../context/CartContext";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    API.get("/menu").then(res => setMenu(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Menu</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {menu.map(item => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>
      <CartDrawer />
    </div>
  );
};

export default Menu;
