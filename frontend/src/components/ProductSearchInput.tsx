// components/ProductSearchInput.tsx

import React from "react";
interface PropsType {
  onSearch: () => void;
  handleSearch: () => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
const ProductSearchInput = ({
  onSearch,
  setSearchTerm,
  handleSearch,
}: PropsType) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={() => onSearch()}
      >
        Search
      </button>
    </div>
  );
};

export default ProductSearchInput;
