const CategoryFilter = ({
    categories,
    selectedCategory,
    setSelectedCategory,
}) => {
    return (
        <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2 rounded-full border transition-all duration-200 ${selectedCategory === category
                            ? "bg-orange-500 text-white border-orange-500"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100 hover:border-orange-400"
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;