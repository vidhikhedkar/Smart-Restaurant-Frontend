import { InputNumber, Divider } from "antd";
import { NumberOutlined } from "@ant-design/icons";
import { useCart } from "../../context/CartContext";

const CartSummary = ({ tableNumber, setTableNumber }) => {
    const { totalPrice } = useCart();

    const gstRate = 0.05;
    const calculatedGst = Number((totalPrice * gstRate).toFixed(2));
    const grandTotal = Number((totalPrice + calculatedGst).toFixed(2));

    
    return (
        <div className="w-full bg-transparent">
            <h3 className="text-base font-bold text-slate-800 mb-4">
                Bill Details
            </h3>

            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Item Subtotal</span>
                    <span className="text-slate-700 font-semibold">
                        ₹{Number(totalPrice).toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                        Taxes & GST <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-bold">5%</span>
                    </span>
                    <span className="text-slate-700 font-semibold">
                        ₹{calculatedGst.toFixed(2)}
                    </span>
                </div>

                <Divider className="my-3 border-slate-200/60" />

                <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-slate-800">Grand Total</span>
                    <span className="text-xl font-black text-slate-800">
                        ₹{grandTotal.toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="mt-6 p-4 bg-white border border-slate-100 rounded-xl flex items-center justify-between gap-4 shadow-sm">
                <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Dining Table
                    </label>
                    <span className="text-xs text-slate-400 mt-0.5 font-medium">
                        Where you are seated
                    </span>
                </div>

                <InputNumber
                    min={1}
                    max={99}
                    value={tableNumber || 1}
                    onChange={(value) => setTableNumber?.(value)}
                    prefix={<NumberOutlined className="text-slate-400" />}
                    className="custom-table-input"
                    style={{
                        width: "90px",
                        height: "38px",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#f8fafc",
                        fontWeight: "700",
                        fontSize: "14px",
                        color: "#1e293b",
                    }}
                />
            </div>

            <style>{`
        .custom-table-input:hover,
        .custom-table-input-focused,
        .custom-table-input:focus {
          border-color: #f97316 !important;
          background-color: #ffffff !important;
          box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.1) !important;
        }
        .custom-table-input .ant-input-number-input {
          height: 36px !important;
          text-align: center;
        }
      `}</style>
        </div>
    );
};

export default CartSummary;