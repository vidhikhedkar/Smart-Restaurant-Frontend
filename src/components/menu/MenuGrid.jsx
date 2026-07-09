import MenuCard from "./MenuCard";

const MenuGrid = ({ menuItems }) => {
    if (!menuItems || !menuItems.length) {
        return (
            <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                <h2 className="text-xl font-bold text-slate-700">
                    No food items found
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                    Try another search or category filter.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {menuItems.map((item, index) => (
                    <div
                        key={item._id || item.id}
                        className="animate-cardReveal"
                        style={{
                            animationDelay: `${index * 40}ms`,
                            animationFillMode: "both"
                        }}
                    >
                        <MenuCard item={item} />
                    </div>
                ))}
            </div>


            <style>{`
        @keyframes cardReveal {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-cardReveal {
          animation: cardReveal 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
        </div>
    );
};

export default MenuGrid;