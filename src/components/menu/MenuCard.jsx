import { Card, Button, Tag } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { FaStar } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const { Meta } = Card;

const MenuCard = ({ item }) => {
    const { addToCart } = useCart();

    const image =
        item.image ||
        "https://placehold.co/600x400?text=Food";

    return (
        <Card
            hoverable
            className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
            cover={
                <img
                    src={image}
                    alt={item.name}
                    className="h-56 w-full object-cover"
                />
            }
        >
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">{item.name}</h2>

                <Tag color="orange">
                    {item.category || "Food"}
                </Tag>
            </div>

            <Meta
                description={
                    item.description ||
                    "Freshly prepared using quality ingredients."
                }
            />

            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-xl font-bold text-orange-500">
                        ₹{item.price}
                    </p>

                    <div className="flex items-center gap-1 text-yellow-500">
                        <FaStar />
                        <span className="text-gray-600">
                            {item.rating || 4.5}
                        </span>
                    </div>
                </div>

                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => addToCart(item)}
                >
                    Add
                </Button>
            </div>
        </Card>
    );
};

export default MenuCard;