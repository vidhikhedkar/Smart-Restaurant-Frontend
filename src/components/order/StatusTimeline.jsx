import { Timeline } from "antd";
import {
    ClockCircleOutlined,
    FireOutlined,
    CheckCircleOutlined,
    SmileOutlined,
} from "@ant-design/icons";

const StatusTimeline = ({ status }) => {
    const steps = [
        {
            key: "pending",
            title: "Order Received",
            icon: <ClockCircleOutlined />,
        },
        {
            key: "preparing",
            title: "Preparing Food",
            icon: <FireOutlined />,
        },
        {
            key: "ready",
            title: "Ready for Pickup / Serving",
            icon: <CheckCircleOutlined />,
        },
        {
            key: "served",
            title: "Order Served",
            icon: <SmileOutlined />,
        },
    ];

    const currentIndex = steps.findIndex(
        (step) => step.key === status
    );

    return (
        <Timeline
            className="mt-6"
            items={steps.map((step, index) => ({
                dot: step.icon,
                color: index <= currentIndex ? "green" : "gray",
                children: (
                    <div>
                        <h3 className="font-semibold">{step.title}</h3>

                        <p className="text-gray-500 text-sm">
                            {index <= currentIndex
                                ? "Completed"
                                : "Waiting"}
                        </p>
                    </div>
                ),
            }))}
        />
    );
};

export default StatusTimeline;