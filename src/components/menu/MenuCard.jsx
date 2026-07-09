import { Card, Button, Tag } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { FaStar } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const { Meta } = Card;

const MenuCard = ({ item }) => {
    const { addToCart } = useCart();

    const fallbackImages = {
        pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop",
        burger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
        pasta: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop",
        drinks: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600&auto=format&fit=crop",
        dessert: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop",
        food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop"
    };

    const categoryKey = item.category?.toLowerCase() || "food";

    const hasValidImage = item.image && typeof item.image === "string" && item.image.trim().length > 0 && !item.image.includes("placeholder");
    
    const displayImage = hasValidImage ? item.image : (fallbackImages[categoryKey] || fallbackImages.food);

    return (
        <Card
            hoverable
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-slate-100"
            cover={
                <div className="overflow-hidden h-52 w-full bg-slate-100 relative group">
                    <img
                        src={displayImage}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = fallbackImages[categoryKey] || fallbackImages.food;
                        }}
                    />
                </div>
            }
        >
            <div className="flex justify-between items-center mb-2 gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-800 truncate">{item.name}</h2>
                <Tag color="orange" className="m-0 rounded-md font-medium capitalize">
                    {item.category || "Food"}
                </Tag>
            </div>

            <Meta
                description={
                    <p className="text-slate-400 text-xs line-clamp-2 h-8">
                        {item.description || "Freshly prepared using premium authentic ingredients."}
                    </p>
                }
            />

            <div className="flex justify-between items-center mt-4 pt-2 border-t border-slate-50">
                <div>
                    <p className="text-xl font-black text-orange-500">
                        ₹{item.price}
                    </p>
                    <div className="flex items-center gap-1 text-amber-500 text-xs mt-0.5 font-semibold">
                        <FaStar />
                        <span className="text-slate-500">
                            {item.rating || 4.5}
                        </span>
                    </div>
                </div>

                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => addToCart(item)}
                    className="hover:scale-105 active:scale-95 transition-transform"
                    style={{
                        backgroundColor: '#f97316',
                        borderColor: '#f97316',
                        borderRadius: '8px',
                        fontWeight: '600'
                    }}
                >
                    Add
                </Button>
            </div>
        </Card>
    );
};

export default MenuCard;