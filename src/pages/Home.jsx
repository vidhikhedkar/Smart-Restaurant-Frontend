import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { FaUtensils, FaMotorcycle, FaClock } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="text-center py-20">

        {/* Hero */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          Welcome to <span className="text-orange-500">Smart Restaurant</span>
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Order food, track it live, and enjoy restaurant experience at your table
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/menu")}
          >
            View Menu
          </Button>

          <Button
            size="large"
            onClick={() => navigate("/login")}
          >
            Kitchen Login
          </Button>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">

          <div className="p-6 bg-white shadow rounded-xl">
            <FaUtensils className="text-4xl text-orange-500 mx-auto" />
            <h3 className="mt-4 font-semibold text-xl">
              Fresh Food
            </h3>
            <p className="text-gray-500 mt-2">
              Cooked fresh by professional chefs
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-xl">
            <FaClock className="text-4xl text-orange-500 mx-auto" />
            <h3 className="mt-4 font-semibold text-xl">
              Live Tracking
            </h3>
            <p className="text-gray-500 mt-2">
              Track your order in real time
            </p>
          </div>

          <div className="p-6 bg-white shadow rounded-xl">
            <FaMotorcycle className="text-4xl text-orange-500 mx-auto" />
            <h3 className="mt-4 font-semibold text-xl">
              Fast Service
            </h3>
            <p className="text-gray-500 mt-2">
              Quick preparation and delivery to table
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Home;