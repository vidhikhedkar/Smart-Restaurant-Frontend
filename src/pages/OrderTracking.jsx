import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    API.get(`/orders/${id}`).then(res => setOrder(res.data));

    socket.on("orderStatusUpdated", updated => {
      if (updated._id === id) setOrder(updated);
    });

    return () => socket.off("orderStatusUpdated");
  }, [id]);

  if (!order) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">Order #{order._id}</h1>
      <p className="text-xl mt-2">Table: {order.tableNumber}</p>
      <p className="text-xl mt-2">Total: ₹{order.totalAmount}</p>
      <p className="text-2xl mt-4 font-bold">
        Status: {order.status.toUpperCase()}
      </p>
    </div>
  );
};

export default OrderTracking;
