import { Card, Button } from "antd";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaPlus } from "react-icons/fa";

const MenuCard = ({ item }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Card cover={<img src={item.image} alt={item.name} />} className="shadow-lg">
      <h2 className="font-semibold text-lg">{item.name}</h2>
      <p className="text-gray-500">₹{item.price}</p>
      <Button
        type="primary"
        className="mt-3 w-full flex items-center justify-center"
        onClick={() => addToCart(item)}
      >
        <FaPlus className="mr-2" /> Add
      </Button>
    </Card>
  );
};

export default MenuCard;
