import React from "react";
import {
  FilterType,
  FILTER_ALL,
  FILTER_COMPLETED,
  FILTER_DELETED,
  FILTER_UNCOMPLETED,
} from "../types/filtertype";

interface FilterProps {
  filterTodos: (filterType: FilterType) => void;
}

const Filter: React.FC<FilterProps> = ({ filterTodos }) => {
  const handleFilterClick = (filterType: FilterType) => {
    filterTodos(filterType);
  };

  return (
    <div>
      <button onClick={() => handleFilterClick(FILTER_ALL)}>全部</button>
      <button onClick={() => handleFilterClick(FILTER_COMPLETED)}>
        已完成
      </button>
      <button onClick={() => handleFilterClick(FILTER_UNCOMPLETED)}>
        未完成
      </button>
      <button onClick={() => handleFilterClick(FILTER_DELETED)}>已刪除</button>
    </div>
  );
};

export default Filter;
