import React from "react";

interface SearchProps {
  searchTodo: (keyword: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchTodo }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchTodo(e.target.value);
  };

  const handleDebounce = debounce(handleInputChange, 500);

  function debounce(
    func: { apply: (arg0: any, arg1: any[]) => void },
    delay = 500
  ) {
    let timer: number;

    return function (this: string, ...args: any[]) {
      let context = this;

      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  return (
    <div>
      <input
        type="text"
        className="search-input"
        onChange={handleDebounce}
        placeholder="搜尋"
        autoComplete="off"
      />
    </div>
  );
};

export default Search;
