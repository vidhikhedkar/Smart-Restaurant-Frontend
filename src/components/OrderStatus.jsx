const OrderStatus = ({ status }) => {
    const colors = {
        pending: "text-yellow-500",
        preparing: "text-blue-500",
        ready: "text-green-500",
        served: "text-gray-500"
    };

    return (
        <p className={`text-2xl font-bold ${colors[status]}`}>
            {status.toUpperCase()}
        </p>
    );
};

export default OrderStatus;
