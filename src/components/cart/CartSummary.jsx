import { Button, InputNumber, Divider, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import API from "../../api/api";

const CartSummary = () => {
    const navigate = useNavigate();

    const {
        cart,
        totalPrice,
        clearCart,
    } = useCart();

    const [loading, setLoading] = useState(false);
    const [tableNumber, setTableNumber] = useState(1);

    const gst = Number((totalPrice * 0.05).toFixed(2));
    const grandTotal = totalPrice + gst;

    const placeOrder = async () => {
        if (cart.length === 0) {
            return message.warning("Your cart is empty.");
        }

        try {
            setLoading(true);

            const order = {
                tableNumber,
                items: cart.map((item) => ({
                    itemId: item._id,
                    name: item.name,
                    quantity: item.qty,
                    price: item.price,
                })),
                totalAmount: grandTotal,
            };

            const res = await API.post("/orders", order);

            message.success("Order placed successfully!");

            clearCart();

            navigate(`/order/${res.data._id}`);
        } catch (error) {
            message.error("Failed to place order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-5">

            <h2 className="text-xl font-bold mb-5">
                Order Summary
            </h2>

            <div className="flex justify-between mb-3">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
            </div>

            <div className="flex justify-between mb-3">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
            </div>

            <Divider />

            <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{grandTotal}</span>
            </div>

            <div className="mt-6">

                <label className="font-medium">
                    Table Number
                </label>

                <InputNumber
                    min={1}
                    value={tableNumber}
                    onChange={(value) => setTableNumber(value)}
                    className="w-full mt-2"
                />

            </div>

            <Button
                type="primary"
                size="large"
                className="w-full mt-6"
                loading={loading}
                onClick={placeOrder}
            >
                Place Order
            </Button>

        </div>
    );
};

export default CartSummary;