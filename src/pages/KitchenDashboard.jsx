import { useEffect, useState } from "react";
import { message, Spin, Empty, Badge } from "antd";
import { LoadingOutlined, FireOutlined, CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import Layout from "../components/layout/Layout";
import API from "../api/api";
import OrderCard from "../components/order/OrderCard";
import socket from "../utils/socket";

const KitchenDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all active orders
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await API.get("/orders");
            setOrders(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to fetch kitchen orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();

        socket.on("orderCreated", (order) => {
            setOrders((prev) => [order, ...prev]);
            message.info(`New Order Placed! Table #${order.tableNumber || 'N/A'}`);
        });

        socket.on("orderStatusUpdated", (updated) => {
            setOrders((prev) =>
                prev.map((o) => (o._id === updated._id ? updated : o))
            );
        });

        return () => {
            socket.off("orderCreated");
            socket.off("orderStatusUpdated");
        };
    }, []);

    // Update order status workflow
    const updateStatus = async (id, status) => {
        try {
            await API.put(`/orders/${id}`, { status });

            setOrders((prev) =>
                prev.map((order) =>
                    order._id === id ? { ...order, status } : order
                )
            );

            message.success(`Order status advanced to: ${status}`);
        } catch (err) {
            console.error(err);
            message.error("Failed to transition status");
        }
    };

    // Split out arrays based on real-time kitchen processing state
    const pendingOrders = orders.filter((o) => o.status?.toLowerCase() === "pending");
    const preparingOrders = orders.filter((o) => o.status?.toLowerCase() === "preparing");
    const readyOrders = orders.filter((o) => o.status?.toLowerCase() === "ready");

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">

                {/* Dynamic Board Header Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 flex items-center gap-3">
                            Kitchen Operations Dashboard
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                        </h1>
                        <p className="text-slate-500 mt-1 text-sm">
                            Manage incoming table tickets and stream live cooking statuses to guests.
                        </p>
                    </div>

                    {/* Core Metrics Ribbon Panel */}
                    <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-3 rounded-2xl self-start md:self-auto">
                        <div className="px-3 py-1 text-center">
                            <span className="block text-xl font-bold text-amber-600">{pendingOrders.length}</span>
                            <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">New</span>
                        </div>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="px-3 py-1 text-center">
                            <span className="block text-xl font-bold text-orange-500">{preparingOrders.length}</span>
                            <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Cooking</span>
                        </div>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="px-3 py-1 text-center">
                            <span className="block text-xl font-bold text-emerald-600">{readyOrders.length}</span>
                            <span className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Ready</span>
                        </div>
                    </div>
                </div>

                {/* Board Main Canvas Context */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 gap-4">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 44, color: '#f97316' }} spin />} />
                        <p className="text-slate-400 text-sm font-medium animate-pulse">Syncing live kitchen pipeline...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 py-24 text-center shadow-sm max-w-xl mx-auto">
                        <Empty
                            description={
                                <div className="space-y-1">
                                    <p className="text-slate-700 font-bold text-base">All caught up!</p>
                                    <p className="text-slate-400 text-sm">No incoming guest table tickets on the grid right now.</p>
                                </div>
                            }
                        />
                    </div>
                ) : (
                    /* Kanban Columns Matrix Container */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        {/* 1. PENDING TICKETS COLUMN */}
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-sm min-h-[500px]">
                            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <ClockCircleOutlined className="text-amber-500 text-lg" />
                                    <h3 className="font-bold text-slate-700 text-base">New Requests</h3>
                                </div>
                                <Badge count={pendingOrders.length} style={{ backgroundColor: '#d97706' }} />
                            </div>
                            <div className="space-y-4">
                                {pendingOrders.map((order) => (
                                    <div key={order._id} className="animate-pulseBorder border-2 border-amber-400/40 rounded-xl overflow-hidden shadow-sm">
                                        <OrderCard order={order} onStatusChange={updateStatus} />
                                    </div>
                                ))}
                                {pendingOrders.length === 0 && <p className="text-center text-xs text-slate-400 py-12 italic">Clear</p>}
                            </div>
                        </div>

                        {/* 2. PREPARING TICKETS COLUMN */}
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-sm min-h-[500px]">
                            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <FireOutlined className="text-orange-500 text-lg" />
                                    <h3 className="font-bold text-slate-700 text-base">In Prep / Cooking</h3>
                                </div>
                                <Badge count={preparingOrders.length} style={{ backgroundColor: '#ea580c' }} />
                            </div>
                            <div className="space-y-4">
                                {preparingOrders.map((order) => (
                                    <OrderCard key={order._id} order={order} onStatusChange={updateStatus} />
                                ))}
                                {preparingOrders.length === 0 && <p className="text-center text-xs text-slate-400 py-12 italic">No active items cooking</p>}
                            </div>
                        </div>

                        {/* 3. READY TO SERVE COLUMN */}
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-sm min-h-[500px]">
                            <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <CheckCircleOutlined className="text-emerald-500 text-lg" />
                                    <h3 className="font-bold text-slate-700 text-base">Ready / Pass</h3>
                                </div>
                                <Badge count={readyOrders.length} style={{ backgroundColor: '#059669' }} />
                            </div>
                            <div className="space-y-4">
                                {readyOrders.map((order) => (
                                    <OrderCard key={order._id} order={order} onStatusChange={updateStatus} />
                                ))}
                                {readyOrders.length === 0 && <p className="text-center text-xs text-slate-400 py-12 italic">Waiting on counter plates</p>}
                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* Embedded Animation Scripting Styles for the Fresh Order Lane Pulsing Trigger */}
            <style>{`
        @keyframes pulseBorder {
          0%, 100% { border-color: rgba(217, 119, 6, 0.15); }
          50% { border-color: rgba(245, 158, 11, 0.6); }
        }
        .animate-pulseBorder {
          animation: pulseBorder 2s infinite ease-in-out;
        }
      `}</style>
        </Layout>
    );
};

export default KitchenDashboard;