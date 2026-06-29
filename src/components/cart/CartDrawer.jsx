import { Drawer, Button, Empty } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartDrawer = () => {
  const [open, setOpen] = useState(false);

  const { cart, totalItems } = useCart();


  const placeOrder = async () => {
    const order = {
      tableNumber: 1,
      items: cart.map((i) => ({
        itemId: i._id,
        name: i.name,
        quantity: i.qty,
        price: i.price,
      })),
      totalAmount: cart.reduce(
        (a, b) => a + b.price * b.qty,
        0
      ),
    };

    const res = await API.post("/orders", order);

    setCart([]);

    navigate(`/order/${res.data._id}`);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <Button
        type="primary"
        shape="round"
        size="large"
        icon={<ShoppingCartOutlined />}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50"
      >
        Cart ({totalItems})
      </Button>

      {/* Drawer */}
      <Drawer
        title={`Your Cart (${totalItems} Items)`}
        placement="right"
        width={420}
        open={open}
        onClose={() => setOpen(false)}
      >
        {cart.length === 0 ? (
          <Empty description="Your cart is empty" />
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                />
              ))}
            </div>

            <div className="mt-8">
              <CartSummary />
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};

export default CartDrawer;