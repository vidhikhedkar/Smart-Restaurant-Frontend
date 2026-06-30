import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import API from "../api/api";
import { Spin, Alert, Empty } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import SearchBar from "../components/menu/SearchBar";
import CategoryFilter from "../components/menu/CategoryFilter";
import MenuGrid from "../components/menu/MenuGrid";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Pizza",
        "Burger",
        "Pasta",
        "Drinks",
        "Dessert",
    ];

    // Fetch menu from backend
    useEffect(() => {
        const fetchMenu = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await API.get("/menu");
                setMenu(res.data);
            } catch (err) {
                console.error("Error fetching menu", err);
                setError("Failed to load the menu. Please try refreshing the page.");
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    // Filtering logic
    const filteredMenu = menu.filter((item) => {
        const matchesCategory =
            selectedCategory === "All" ||
            item.category?.toLowerCase() === selectedCategory.toLowerCase();

        const matchesSearch = item.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">

                {/* Header & Item Counter Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
                            Our Delicious Menu
                        </h1>
                        <p className="text-slate-500 mt-2 text-sm sm:text-base">
                            Select your favorites and track your order straight to your table.
                        </p>
                    </div>
                    {!loading && !error && (
                        <span className="text-xs sm:text-sm font-semibold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full self-start md:self-auto">
                            Showing {filteredMenu.length} {filteredMenu.length === 1 ? 'item' : 'items'}
                        </span>
                    )}
                </div>

                {/* Filter Controls Wrapper */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 mb-10 space-y-6 transition-all">
                    <div className="max-w-md">
                        <SearchBar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    </div>
                    <div className="border-t border-slate-100 pt-4">
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>
                </div>

                {/* Dynamic Context States (Loading / Error / Empty / Content Grid) */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: '#f97316' }} spin />} />
                        <p className="text-slate-400 text-sm font-medium animate-pulse">Gathering fresh ingredients...</p>
                    </div>
                ) : error ? (
                    <div className="my-8">
                        <Alert
                            message="Connection Issue"
                            description={error}
                            type="error"
                            showIcon
                            closable
                        />
                    </div>
                ) : filteredMenu.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-100 py-16 px-4 text-center shadow-sm">
                        <Empty
                            description={
                                <div className="space-y-1">
                                    <p className="text-slate-700 font-semibold text-base">No dishes match your selection</p>
                                    <p className="text-slate-400 text-xs sm:text-sm">Try tweaking your keywords or exploring another category!</p>
                                </div>
                            }
                        />
                    </div>
                ) : (
                    <div className="animate-fadeIn">
                        <MenuGrid menuItems={filteredMenu} />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Menu;