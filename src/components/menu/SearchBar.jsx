import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full mb-6">
      <Input
        size="large"
        placeholder="Search food (e.g. Pizza, Burger, Pasta...)"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
      />
    </div>
  );
};

export default SearchBar;