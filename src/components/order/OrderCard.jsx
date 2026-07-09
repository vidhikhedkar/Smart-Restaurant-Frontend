import { Card, Button, Divider, Tooltip } from "antd";
import { PlayCircleOutlined, CheckCircleOutlined, SendOutlined, ClockCircleOutlined, RollbackOutlined } from "@ant-design/icons";
import OrderStatus from "./OrderStatus";

const OrderCard = ({ order, onStatusChange }) => {
    const statusLower = order.status?.toLowerCase();

    const formatCurrency = (amount) => `₹${Number(amount).toFixed(2)}`;

    return (
        <Card
            className="shadow-sm rounded-2xl border border-slate-100 bg-white overflow-hidden hover:shadow-md transition-all duration-200"
            bodyStyle={{ padding: "20px" }}
            title={
                <div className="flex justify-between items-center py-1">
                    <div className="flex flex-col gap-0.5">
                        <span className="font-extrabold text-slate-800 text-base">
                            Table {order.tableNumber}
                        </span>
                        <span className="text-[11px] text-slate-400 font-normal flex items-center gap-1">
                            <ClockCircleOutlined style={{ fontSize: '10px' }} /> Just now
                        </span>
                    </div>
                    <OrderStatus status={order.status} />
                </div>
            }
        >
            <div className="divide-y divide-slate-50 space-y-2.5">
                {order.items.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center text-sm pt-2.5 first:pt-0"
                    >
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center justify-center bg-slate-100 text-slate-600 font-bold text-xs px-2 py-0.5 rounded-md min-w-6">
                                {item.quantity}x
                            </span>
                            <span className="font-medium text-slate-700">{item.name}</span>
                        </div>
                        <span className="font-semibold text-slate-500">
                            {formatCurrency(item.price * item.quantity)}
                        </span>
                    </div>
                ))}
            </div>

            <Divider className="my-4 border-slate-100" />

            <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Amount</span>
                <span className="text-xl font-black text-slate-800">
                    {formatCurrency(order.totalAmount)}
                </span>
            </div>

            {onStatusChange && (
                <div className="mt-5 flex items-center gap-2 flex-wrap">
                    {statusLower === "pending" && (
                        <Button
                            type="primary"
                            className="w-full flex items-center justify-center gap-1.5"
                            icon={<PlayCircleOutlined />}
                            style={{ backgroundColor: "#f97316", borderColor: "#f97316", borderRadius: "10px", height: "38px", fontWeight: "600" }}
                            onClick={() => onStatusChange(order._id, "preparing")}
                        >
                            Start Cooking
                        </Button>
                    )}

                    {statusLower === "preparing" && (
                        <Button
                            type="primary"
                            className="w-full flex items-center justify-center gap-1.5"
                            icon={<CheckCircleOutlined />}
                            style={{ backgroundColor: "#ea580c", borderColor: "#ea580c", borderRadius: "10px", height: "38px", fontWeight: "600" }}
                            onClick={() => onStatusChange(order._id, "ready")}
                        >
                            Mark Ready
                        </Button>
                    )}

                    {statusLower === "ready" && (
                        <Button
                            type="primary"
                            className="w-full flex items-center justify-center gap-1.5"
                            icon={<SendOutlined />}
                            style={{ backgroundColor: "#10b981", borderColor: "#10b981", borderRadius: "10px", height: "38px", fontWeight: "600" }}
                            onClick={() => onStatusChange(order._id, "served")}
                        >
                            Serve to Table
                        </Button>
                    )}

                    {statusLower !== "pending" && statusLower !== "served" && (
                        <Tooltip title="Move order back a step">
                            <Button
                                type="text"
                                size="small"
                                icon={<RollbackOutlined />}
                                className="text-slate-400 hover:text-orange-500 mt-1 mx-auto text-xs flex items-center gap-1"
                                onClick={() => {
                                    const targetPrev = statusLower === "ready" ? "preparing" : "pending";
                                    onStatusChange(order._id, targetPrev);
                                }}
                            >
                                Revert Stage
                            </Button>
                        </Tooltip>
                    )}

                    {statusLower === "served" && (
                        <div className="w-full bg-emerald-50 text-emerald-600 text-center font-bold text-xs py-2 rounded-xl border border-emerald-100">
                             Order Delivered Successfully
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
};

export default OrderCard;