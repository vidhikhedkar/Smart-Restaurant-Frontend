import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import API from "../api/api";

import SearchBar from "../components/menu/SearchBar";
import CategoryFilter from "../components/menu/CategoryFilter";
import MenuGrid from "../components/menu/MenuGrid";
import CartDrawer from "../components/cart/CartDrawer";

const Menu = () => {
    const [menu, setMenu] = useState([]);
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
                const res = await API.get("/menu");
                setMenu(res.data);
            } catch (err) {
                console.log("Error fetching menu", err);
            }
        };

        fetchMenu();
    }, []);

    // Filtering logic
    const filteredMenu = menu.filter((item) => {
        const matchesCategory =
            selectedCategory === "All" ||
            item.category === selectedCategory;

        const matchesSearch = item.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">
                Menu
            </h1>

            {/* Search */}
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            {/* Categories */}
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            {/* Menu Grid */}
            <MenuGrid menuItems={filteredMenu} />

            {/* Cart Drawer (floating cart) */}
            <CartDrawer />
        </Layout>
    );
};

export default Menu;