import { Tag } from "antd";
import {
    ClockCircleOutlined,
    FireOutlined,
    CheckCircleOutlined,
    SmileOutlined,
} from "@ant-design/icons";

const OrderStatus = ({ status }) => {
    const statusConfig = {
        pending: {
            color: "gold",
            icon: <ClockCircleOutlined />,
            text: "Pending",
        },
        preparing: {
            color: "processing",
            icon: <FireOutlined />,
            text: "Preparing",
        },
        ready: {
            color: "success",
            icon: <CheckCircleOutlined />,
            text: "Ready",
        },
        served: {
            color: "default",
            icon: <SmileOutlined />,
            text: "Served",
        },
    };

    const current = statusConfig[status] || statusConfig.pending;

    return (
        <Tag
            color={current.color}
            icon={current.icon}
            className="text-base px-4 py-1"
        >
            {current.text}
        </Tag>
    );
};

export default OrderStatus;