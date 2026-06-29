import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message, Card, Divider } from "antd";
import Layout from "../components/layout/Layout";
import API from "../api/api";

import OrderStatus from "../components/order/OrderStatus";
import StatusTimeline from "../components/order/StatusTimeline";

import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const OrderTracking = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch order details
    const fetchOrder = async () => {
        try {
            setLoading(true);

            const res = await API.get(`/orders/${id}`);
            setOrder(res.data);

        } catch (err) {
            message.error("Failed to load order");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();

        // Live updates using Socket.IO
        socket.on("orderStatusUpdated", (updated) => {
            if (updated._id === id) {
                setOrder(updated);
            }
        });

        socket.on("orderCreated", (newOrder) => {
            console.log("New order:", newOrder);
        });

        return () => {
            socket.off("orderStatusUpdated");
        };
    }, [id]);

    if (loading || !order) {
        return (
            <Layout>
                <p className="p-6">Loading order...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">

                <Card className="shadow-md">
                    <h1 className="text-2xl font-bold mb-4">
                        Order #{order._id}
                    </h1>

                    <p className="text-gray-600">
                        Table Number: <b>{order.tableNumber}</b>
                    </p>

                    <p className="text-gray-600 mt-1">
                        Total Amount: <b>₹{order.totalAmount}</b>
                    </p>

                    <Divider />

                    {/* Status */}
                    <div className="mt-4">
                        <OrderStatus status={order.status} />
                    </div>

                    {/* Timeline */}
                    <StatusTimeline status={order.status} />
                </Card>

            </div>
        </Layout>
    );
};

export default OrderTracking;