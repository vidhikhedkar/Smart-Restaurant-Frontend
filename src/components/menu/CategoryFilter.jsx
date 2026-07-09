import {FaUtensils,FaPizzaSlice,FaBurger,FaBowlFood,FaGlassWater,FaCakeCandles} from "react-icons/fa6";

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory, }) => {

    const getCategoryIcon = (category) => {
        switch (category.toLowerCase()) {
            case "all":
                return <FaUtensils className="text-sm" />;
            case "pizza":
                return <FaPizzaSlice className="text-sm" />;
            case "burger":
                return <FaBurger className="text-sm" />;
            case "pasta":
                return <FaBowlFood className="text-sm" />;
            case "drinks":
                return <FaGlassWater className="text-sm" />;
            case "dessert":
                return <FaCakeCandles className="text-sm" />;
            default:
                return <FaUtensils className="text-sm" />;
        }
    };


    return (
        <div className="w-full">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
                {categories.map((category) => {
                    const isSelected = selectedCategory === category;
                    return (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 snap-center group hover:-translate-y-0.5 active:scale-95 border
                             ${isSelected
                                    ? "bg-linear-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-md shadow-orange-500/20"
                                    : "bg-slate-50 text-slate-600 border-slate-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-100"
                                }  `}
                        >
                            <span className={`transition-colors duration-200 ${isSelected ? "text-white" : "text-slate-400 group-hover:text-orange-500"}`}>
                                {getCategoryIcon(category)}
                            </span>
                            <span>{category}</span>
                        </button>
                    );
                })}
            </div>

            <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};

export default CategoryFilter;