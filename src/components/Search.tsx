import React from "react";

interface SearchProps {
  searchTodo: (keyword: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchTodo }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value === "") {
      searchTodo(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Delete" || e.key === "Backspace") {
      const { value } = e.currentTarget;
      searchTodo(value);
    }
  };

  return (
    <div>
      <input
        type="text"
        className="search-input"
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="請按下Enter搜尋"
        autoComplete="off"
      />
    </div>
  );
};

export default Search;
