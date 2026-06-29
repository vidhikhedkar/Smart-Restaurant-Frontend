import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="text-center py-20">
                <h1 className="text-7xl font-bold text-gray-800">
                    404
                </h1>

                <h2 className="text-2xl font-semibold mt-4">
                    Page Not Found
                </h2>

                <p className="text-gray-500 mt-2">
                    The page you are looking for does not exist.
                </p>

                <Button
                    type="primary"
                    className="mt-6"
                    onClick={() => navigate("/")}
                >
                    Go Home
                </Button>
            </div>
        </Layout>
    );
};

export default NotFound;