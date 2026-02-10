import { Drawer, Button } from "antd";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const { cart, setCart } = useContext(CartContext);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const placeOrder = async () => {
    const order = {
      tableNumber: 1,
      items: cart.map(i => ({
        itemId: i._id,
        name: i.name,
        quantity: i.qty,
        price: i.price
      })),
      totalAmount: cart.reduce((a, b) => a + b.price * b.qty, 0)
    };

    const res = await API.post("/orders", order);
    setCart([]);
    navigate(`/order/${res.data._id}`);
  };

  return (
    <Drawer title="Your Cart" open={open} onClose={() => setOpen(false)}>
      {cart.map(item => (
        <p key={item._id}>
          {item.name} x {item.qty}
        </p>
      ))}
      <Button type="primary" className="mt-4 w-full" onClick={placeOrder}>
        Place Order
      </Button>
    </Drawer>
  );
};

export default CartDrawer;
