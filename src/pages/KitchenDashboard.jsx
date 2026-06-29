import { useEffect, useState } from "react";
import { message } from "antd";
import Layout from "../components/layout/Layout";
import API from "../api/api";
import OrderCard from "../components/order/OrderCard";
import socket from "../utils/socket";

const KitchenDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all orders
    const fetchOrders = async () => {
        try {
            setLoading(true);

            const res = await API.get("/orders");
            setOrders(res.data);

        } catch (err) {
            message.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();

        socket.on("orderCreated", (order) => {
            setOrders((prev) => [order, ...prev]);
        });

        socket.on("orderStatusUpdated", (updated) => {
            setOrders((prev) =>
                prev.map((o) =>
                    o._id === updated._id ? updated : o
                )
            );
        });

        return () => {
            socket.off("orderCreated");
            socket.off("orderStatusUpdated");
        };
    }, []);

    // Update order status
    const updateStatus = async (id, status) => {
        try {
            await API.put(`/orders/${id}`, { status });

            setOrders((prev) =>
                prev.map((order) =>
                    order._id === id
                        ? { ...order, status }
                        : order
                )
            );

            message.success(`Order marked as ${status}`);
        } catch (err) {
            message.error("Failed to update order");
        }
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">
                Kitchen Dashboard
            </h1>

            {loading ? (
                <p>Loading orders...</p>
            ) : orders.length === 0 ? (
                <p>No orders yet</p>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {orders.map((order) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            onStatusChange={updateStatus}
                        />
                    ))}
                </div>
            )}
        </Layout>
    );
};

export default KitchenDashboard;