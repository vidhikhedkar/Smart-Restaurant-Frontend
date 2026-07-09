import { Button, Badge, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { FaUtensils, FaMotorcycle, FaClock, FaQrcode, FaCheckCircle, FaStar } from "react-icons/fa";

const Home = () => {
    const navigate = useNavigate();

    const featuredDishes = [
        { id: 1, name: "Truffle Mushroom Burger", price: "$14.99", tag: "Best Seller", rating: 4.9, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60" },
        { id: 2, name: "Spicy Rigatoni Vodka", price: "$16.50", tag: "Chef Special", rating: 4.8, image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500&auto=format&fit=crop&q=60" },
        { id: 3, name: "Crunchy Avocado Roll", price: "$12.00", tag: "Fresh", rating: 4.7, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&auto=format&fit=crop&q=60" },
    ];


    const testimonials = [
        { name: "Sarah M.", role: "Food Blogger", review: "The QR code ordering was seamless! Food arrived roaring hot in less than 15 minutes.", rating: 5 },
        { name: "David K.", role: "Regular Customer", review: "Live tracking inside the restaurant is a game changer. Kids loved watching the preparation stages.", rating: 5 },
        {
            name: "Rahul R.",
            role: "Regular Customer",
            review: "The ordering process was quick and hassle-free. The food was delicious, and the live order tracking made the experience even better.",
            rating: 5
        }
    ];

    return (
        <Layout>
            <div className="container py-12 ">

                {/* 1. Hero Section */}
                <div className="text-center bg-linear-to-b from-orange-100/50 to-transparent rounded-3xl p-8 sm:p-12 border border-orange-100">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-800">
                        Welcome to <span className="text-orange-500 bg-linear-to-r from-orange-500 to-amber-500 bg-clip-text">Smart Restaurant</span>
                    </h1>

                    <p className="mt-6 text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Order food, track it live, and enjoy an effortless, modern dining experience right at your table.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button
                            type="primary"
                            size="large"
                            style={{
                                backgroundColor: '#f97316',
                                borderColor: '#f97316',
                                height: '48px',
                                padding: '0 32px',
                                borderRadius: '8px',
                                fontWeight: '600',
                                fontSize: '16px'
                            }}
                            onClick={() => navigate("/menu")}
                        >
                            View Menu
                        </Button>

                        <Button
                            size="large"
                            style={{
                                height: '48px',
                                padding: '0 32px',
                                borderRadius: '8px',
                                fontWeight: '500',
                                fontSize: '16px',
                                borderColor: '#e2e8f0',
                                color: '#475569'
                            }}
                            className="hover:border-orange-500 hover:text-orange-500"
                            onClick={() => navigate("/login")}
                        >
                            Kitchen Login
                        </Button>
                    </div>
                </div>


                {/* 2. Stats Banner Section */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div>
                        <p className="text-3xl font-extrabold text-orange-500">10 Min</p>
                        <p className="text-sm text-slate-500 font-medium mt-1">Avg. Prep Time</p>
                    </div>
                    <div className="border-l border-slate-200">
                        <p className="text-3xl font-extrabold text-slate-800">4.9/5</p>
                        <p className="text-sm text-slate-500 font-medium mt-1">Customer Rating</p>
                    </div>
                    <div className="border-l border-slate-200 col-span-1">
                        <p className="text-3xl font-extrabold text-slate-800">100%</p>
                        <p className="text-sm text-slate-500 font-medium mt-1">Fresh Ingredients</p>
                    </div>
                    <div className="border-l border-slate-200">
                        <p className="text-3xl font-extrabold text-slate-800">Contactless</p>
                        <p className="text-sm text-slate-500 font-medium mt-1">Table Ordering</p>
                    </div>
                </div>


                {/* 3. Core Features Section */}
                <div className="mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Why Dine With Us?</h2>
                        <p className="text-slate-500 mt-2">We combine culinary excellence with smart tech.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="group p-8 bg-white border border-slate-100 shadow-sm rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-orange-100 text-center">
                            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto transition-colors duration-300 group-hover:bg-orange-500">
                                <FaUtensils className="text-2xl text-orange-500 transition-colors duration-300 group-hover:text-white" />
                            </div>
                            <h3 className="mt-6 font-bold text-xl text-slate-800">Fresh Food</h3>
                            <p className="text-slate-500 mt-2 text-sm leading-relaxed">Every single plate is cooked fresh to order by our team of professional chefs.</p>
                        </div>

                        <div className="group p-8 bg-white border border-slate-100 shadow-sm rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-orange-100 text-center">
                            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto transition-colors duration-300 group-hover:bg-orange-500">
                                <FaClock className="text-2xl text-orange-500 transition-colors duration-300 group-hover:text-white" />
                            </div>
                            <h3 className="mt-6 font-bold text-xl text-slate-800">Live Tracking</h3>
                            <p className="text-slate-500 mt-2 text-sm leading-relaxed">Know exactly where your meal stands from prep to step with live milestone alerts.</p>
                        </div>

                        <div className="group p-8 bg-white border border-slate-100 shadow-sm rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-orange-100 text-center sm:col-span-2 md:col-span-1">
                            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto transition-colors duration-300 group-hover:bg-orange-500">
                                <FaMotorcycle className="text-2xl text-orange-500 transition-colors duration-300 group-hover:text-white" />
                            </div>
                            <h3 className="mt-6 font-bold text-xl text-slate-800">Fast Service</h3>
                            <p className="text-slate-500 mt-2 text-sm leading-relaxed">Minimized wait times via our streamlined kitchen and immediate table delivery.</p>
                        </div>
                    </div>
                </div>


                {/* 4. Featured Dishes Section */}
                <div className="mt-28">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Customer Favorites</h2>
                            <p className="text-slate-500 mt-1">Our most ordered dishes this week.</p>
                        </div>
                        <Button type="link" className="text-orange-500 font-semibold text-base" onClick={() => navigate("/menu")}>
                            See Full Menu →
                        </Button>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {featuredDishes.map((dish) => (
                            <div key={dish.id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="relative h-48 bg-slate-100">
                                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-3 left-3">
                                        <Badge count={dish.tag} style={{ backgroundColor: '#f97316' }} />
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{dish.name}</h3>
                                        <span className="font-extrabold text-orange-500 text-lg">{dish.price}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <FaStar className="text-amber-400 text-sm" />
                                        <span className="text-sm font-semibold text-slate-700">{dish.rating}</span>
                                    </div>
                                    <Button
                                        type="primary"
                                        ghost
                                        className="w-full mt-5 border-orange-500 text-orange-500 hover:bg-orange-50 hover:border-orange-500"
                                        style={{ borderRadius: '6px', fontWeight: '500' }}
                                        onClick={() => navigate("/menu")}
                                    >
                                        Order Now
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


                {/* 5. How It Works Section */}
                <div className="mt-28 bg-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-300">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">How It Works</h2>
                        <p className="text-slate-500 mt-2">Three simple steps to delicious food.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        <div className="text-center relative z-10">
                            <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mx-auto text-lg font-bold text-orange-500 mb-4">
                                <FaQrcode className="text-xl" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800">1. Scan QR Code</h4>
                            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">Find the unique QR code right on your dining table and scan with your phone.</p>
                        </div>

                        <div className="text-center relative z-10">
                            <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mx-auto text-lg font-bold text-orange-500 mb-4">
                                <FaUtensils className="text-xl" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800">2. Order & Pay</h4>
                            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">Browse our digital menu, customize your dishes, and check out securely.</p>
                        </div>

                        <div className="text-center relative z-10">
                            <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mx-auto text-lg font-bold text-orange-500 mb-4">
                                <FaCheckCircle className="text-xl" />
                            </div>
                            <h4 className="font-bold text-lg text-slate-800">3. Track & Enjoy</h4>
                            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto">Watch your order's real-time updates while it's prepped and served directly to you.</p>
                        </div>
                    </div>
                </div>


                {/* 6. Testimonials Section */}
                <div className="mt-28 mb-8">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-800">What Our Guests Say</h2>
                        <p className="text-slate-500 mt-2">Real feedback from recent smart-diners.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {testimonials.map((t, index) => (
                            <div key={index} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col justify-between">
                                <div>
                                    <Rate disabled defaultValue={t.rating} style={{ color: '#fbbf24', fontSize: '14px' }} />
                                    <p className="text-slate-600 mt-3 italic text-sm sm:text-base leading-relaxed">"{t.review}"</p>
                                </div>
                                <div className="mt-6 flex items-center gap-3 border-t border-slate-50 pt-4">
                                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-sm text-slate-800">{t.name}</h5>
                                        <p className="text-xs text-slate-400">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;