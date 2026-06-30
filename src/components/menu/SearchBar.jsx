import { useEffect, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  // Use local state to handle immediate user typing seamlessly without UI lag
  const [localValue, setLocalValue] = useState(searchTerm);

  // Debounce logic: Updates parent state 300ms after the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(localValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [localValue, setSearchTerm]);

  // Sync local state if parent state changes externally (e.g., clearing filters)
  useEffect(() => {
    setLocalValue(searchTerm);
  }, [searchTerm]);

  return (
    <div className="w-full">
      <Input
        size="large"
        placeholder="Search for dishes, cuisines, or drinks..."
        prefix={
          <SearchOutlined
            className="text-slate-400 mr-1.5 transition-colors duration-200"
            style={{ fontSize: "18px" }}
          />
        }
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        allowClear
        className="custom-search-input group"
        style={{
          height: "50px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          backgroundColor: "#f8fafc",
          fontSize: "15px",
          fontWeight: "500",
          color: "#334155",
          transition: "all 0.2s ease-in-out",
        }}
      />

      {/* Scoped input control styles */}
      <style>{`
        .custom-search-input:hover,
        .custom-search-input:focus,
        .custom-search-input-focused {
          border-color: #f97316 !important;
          background-color: #ffffff !important;
          box-shadow: 0 4px 12px rgba(249, 115, 22, 0.08) !important;
        }
        .custom-search-input .ant-input-clear-icon {
          color: #94a3b8;
          transition: color 0.2s;
        }
        .custom-search-input .ant-input-clear-icon:hover {
          color: #f97316;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;