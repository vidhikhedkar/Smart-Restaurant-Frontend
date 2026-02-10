import { Table, Select } from "antd";
import { useEffect, useState } from "react";
import API from "../api/api";

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await API.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/orders/${id}`, { status });
    setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Kitchen Dashboard</h1>
      <Table
        dataSource={orders}
        rowKey="_id"
        columns={[
          { title: "Table", dataIndex: "tableNumber" },
          { title: "Total", dataIndex: "totalAmount" },
          {
            title: "Status",
            render: (_, record) => (
              <Select
                value={record.status}
                onChange={(val) => updateStatus(record._id, val)}
              >
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="preparing">Preparing</Select.Option>
                <Select.Option value="ready">Ready</Select.Option>
                <Select.Option value="served">Served</Select.Option>
              </Select>
            )
          }
        ]}
      />
    </div>
  );
};

export default KitchenDashboard;
