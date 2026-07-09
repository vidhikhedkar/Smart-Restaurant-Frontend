import { Drawer, Button, Empty, message } from "antd";
import { ShoppingCartOutlined, LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import API from "../../api/api";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartDrawer = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { cart, totalItems, clearCart, isCartOpen, setIsCartOpen, totalPrice } = useCart();


  const placeOrder = async () => {
    try {
      setLoading(true);
      const gstRate = 0.05;
      const calculatedGst = Number((totalPrice * gstRate).toFixed(2));
      const grandTotal = Number((totalPrice + calculatedGst).toFixed(2));
      const order = {
        tableNumber: 1,
        items: cart.map((i) => ({
          itemId: i._id,
          name: i.name,
          quantity: i.qty,
          price: i.price,
        })),
        totalAmount: grandTotal,
      };

      const res = await API.post("/orders", order);
      clearCart();
      setIsCartOpen(false);
      message.success("Order placed successfully! Sending to kitchen...");
      navigate(`/order/${res.data._id}`);
    } catch (err) {
      console.error("Error processing order:", err);
      message.error("Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {totalItems > 0 && (
        <Button
          type="primary"
          shape="round"
          size="large"
          icon={<ShoppingCartOutlined style={{ fontSize: '18px' }} />}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-1 shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200"
          style={{
            backgroundColor: '#f97316',
            borderColor: '#f97316',
            height: '52px',
            padding: '0 24px',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.4)'
          }}
        >
          View Cart
          <span className="bg-white text-orange-500 rounded-full px-2 py-0.5 text-xs font-bold ml-1.5 min-w-5 text-center shadow-inner">
            {totalItems}
          </span>
        </Button>
      )}


      <Drawer
        title={
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 text-lg">Your Table Order</span>
            <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-md font-semibold">
              {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
            </span>
          </div>
        }
        placement="right"
        width={window.innerWidth < 480 ? "100%" : 420}
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        styles={{
          body: {
            display: 'flex',
            flexDirection: 'column',
            padding: 0
          }
        }}
      >
        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="text-center">
                  <p className="text-slate-700 font-semibold text-base">Your cart is empty</p>
                  <p className="text-slate-400 text-xs mt-1">Browse the menu to pick your favorite dishes.</p>
                </div>
              }
            />
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            <div className="border-t border-slate-100 bg-slate-50/70 backdrop-blur-sm p-6 sticky bottom-0 z-10 shadow-[0_-8px_24px_rgba(0,0,0,0.02)]">
              <CartSummary />

              <Button
                type="primary"
                size="large"
                loading={loading}
                icon={loading ? <LoadingOutlined /> : null}
                onClick={placeOrder}
                className="w-full mt-4 flex items-center justify-center"
                style={{
                  backgroundColor: '#f97316',
                  borderColor: '#f97316',
                  height: '50px',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '16px'
                }}
              >
                {loading ? "Confirming Order..." : "Place Order & Dine"}
              </Button>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};

export default CartDrawer;