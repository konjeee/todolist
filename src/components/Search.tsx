import React from 'react';

interface SearchProps {
  searchTodo: (keyword: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchTodo }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    searchTodo(value);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="關鍵字搜尋"
        autoComplete="off"
      />
    </div>
  );
};

export default Search;