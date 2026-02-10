import { Form, Input, Button, Card, message } from "antd";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await API.post("/auth/login", values);
      localStorage.setItem("token", res.data.token);
      message.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      message.error("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="Kitchen Login" className="w-96">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" required>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" required>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
