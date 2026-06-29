import MenuCard from "./MenuCard";

const MenuGrid = ({ menuItems }) => {
    if (!menuItems.length) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold text-gray-600">
                    No food items found
                </h2>

                <p className="text-gray-500 mt-2">
                    Try another search or category.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {menuItems.map((item) => (
                <MenuCard key={item._id} item={item} />
            ))}
        </div>
    );
};

export default MenuGrid;