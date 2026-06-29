import { Button } from "antd";
import {
    PlusOutlined,
    MinusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
    const {
        increaseQty,
        decreaseQty,
        removeFromCart,
    } = useCart();

    return (
        <div className="flex items-center gap-4 border-b pb-4 mb-4">

            {/* Food Image */}
            <img
                src={
                    item.image ||
                    "https://placehold.co/100x100?text=Food"
                }
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
            />

            {/* Food Details */}
            <div className="flex-1">
                <h3 className="font-semibold text-lg">
                    {item.name}
                </h3>

                <p className="text-gray-500">
                    ₹{item.price}
                </p>

                <p className="font-semibold text-orange-500 mt-1">
                    ₹{item.price * item.qty}
                </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">

                <Button
                    icon={<MinusOutlined />}
                    onClick={() => decreaseQty(item._id)}
                />

                <span className="font-bold text-lg">
                    {item.qty}
                </span>

                <Button
                    icon={<PlusOutlined />}
                    onClick={() => increaseQty(item._id)}
                />

            </div>

            {/* Remove */}
            <Button
                danger
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => removeFromCart(item._id)}
            />
        </div>
    );
};

export default CartItem;