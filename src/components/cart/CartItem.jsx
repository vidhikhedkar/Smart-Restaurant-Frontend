import { Button } from "antd";
import {
    PlusOutlined,
    MinusOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
    const { increaseQty, decreaseQty, removeFromCart } = useCart();

    // Modern UI clean fallback image link
    const fallbackImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=60";

    return (
        <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-100 hover:border-slate-200 shadow-sm transition-all relative group">

            {/* 1. Food Image with Aspect Crop */}
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                <img
                    src={item.image || item.imageUrl || fallbackImage}
                    alt={item.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                    }}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 2. Details Stack */}
            <div className="flex-1 min-w-0 pr-2">
                <h4 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-1 truncate">
                    {item.name}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                    ₹{Number(item.price).toFixed(2)} each
                </p>
                <p className="font-extrabold text-sm text-orange-500 mt-1.5">
                    ₹{Number(item.price * item.qty).toFixed(2)}
                </p>
            </div>

            {/* 3. Streamlined Inline Action Controls */}
            <div className="flex flex-col items-end justify-between gap-3 h-20 shrink-0">

                {/* Absolute-feeling Delete Action */}
                <Button
                    danger
                    type="text"
                    size="small"
                    icon={<DeleteOutlined className="text-slate-300 group-hover:text-red-500 transition-colors" />}
                    onClick={() => removeFromCart(item._id)}
                    className="hover:bg-red-50 rounded-md -mt-1 -mr-1"
                />

                {/* Dynamic Stepper Control */}
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-lg p-0.5 shadow-inner">
                    <Button
                        type="text"
                        size="small"
                        icon={<MinusOutlined style={{ fontSize: "10px" }} />}
                        className="text-slate-500 hover:text-orange-500 flex items-center justify-center rounded-md"
                        style={{ width: "24px", height: "24px" }}
                        onClick={() => decreaseQty(item._id)}
                    />

                    <span className="font-bold text-slate-700 text-sm px-2 min-w-[24px] text-center">
                        {item.qty}
                    </span>

                    <Button
                        type="text"
                        size="small"
                        icon={<PlusOutlined style={{ fontSize: "10px" }} />}
                        className="text-slate-500 hover:text-orange-500 flex items-center justify-center rounded-md"
                        style={{ width: "24px", height: "24px" }}
                        onClick={() => increaseQty(item._id)}
                    />
                </div>

            </div>
        </div>
    );
};

export default CartItem;