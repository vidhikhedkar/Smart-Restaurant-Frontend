import { Card, Button, Divider } from "antd";
import OrderStatus from "./OrderStatus";

const OrderCard = ({ order, onStatusChange }) => {
    return (
        <Card
            className="shadow-md rounded-xl mb-4"
            title={
                <div className="flex justify-between items-center">
                    <span className="font-bold">
                        Table {order.tableNumber}
                    </span>

                    <OrderStatus status={order.status} />
                </div>
            }
        >
            {/* Items */}
            <div className="space-y-2">
                {order.items.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between text-sm"
                    >
                        <span>
                            {item.name} × {item.quantity}
                        </span>

                        <span>₹{item.price * item.quantity}</span>
                    </div>
                ))}
            </div>

            <Divider />

            {/* Total */}
            <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
            </div>

            {/* Actions */}
            {onStatusChange && (
                <div className="mt-4 flex gap-2 flex-wrap">
                    <Button
                        size="small"
                        onClick={() =>
                            onStatusChange(order._id, "pending")
                        }
                    >
                        Pending
                    </Button>

                    <Button
                        size="small"
                        type="primary"
                        onClick={() =>
                            onStatusChange(order._id, "preparing")
                        }
                    >
                        Preparing
                    </Button>

                    <Button
                        size="small"
                        type="default"
                        onClick={() =>
                            onStatusChange(order._id, "ready")
                        }
                    >
                        Ready
                    </Button>

                    <Button
                        size="small"
                        type="dashed"
                        onClick={() =>
                            onStatusChange(order._id, "served")
                        }
                    >
                        Served
                    </Button>
                </div>
            )}
        </Card>
    );
};

export default OrderCard;