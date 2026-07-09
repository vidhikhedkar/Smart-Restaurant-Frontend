import { useState } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { loginUser } from "../api/auth";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const onFinish = async (values) => {
        try {
            setLoading(true);
            const res = await loginUser(values);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            message.success("Login successful");
            navigate("/dashboard");
        } catch (err) {
            message.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="flex justify-center items-center py-20">
            <Card title="Kitchen Login" className="w-96 shadow-lg">
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label="Email" name="email" required>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Password" name="password" required>
                        <Input.Password />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                        Login
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Login;