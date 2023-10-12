import { useState } from "react";
import React from "react";
import {
  FilterType,
  FILTER_ALL,
  FILTER_COMPLETED,
  FILTER_DELETED,
  FILTER_UNCOMPLETED,
} from "./filtertype";

interface FilterProps {
  filterTodos: (filterType: FilterType) => void;
}

const Filter: React.FC<FilterProps> = ({ filterTodos }) => {
  const [active, setActive] = useState("");

  const handleFilterClick = (filterType: FilterType) => {
    filterTodos(filterType);
    setActive(filterType);
  };

  return (
    <div className="filter-buttons">
      <button
        className={active === "all" ? "active" : undefined}
        onClick={() => handleFilterClick(FILTER_ALL)}
      >
        全部
      </button>
      <button
        className={active === "completed" ? "active" : undefined}
        onClick={() => handleFilterClick(FILTER_COMPLETED)}
      >
        已完成
      </button>
      <button
        className={active === "uncompleted" ? "active" : undefined}
        onClick={() => handleFilterClick(FILTER_UNCOMPLETED)}
      >
        未完成
      </button>
      <button
        className={active === "deleted" ? "active" : undefined}
        onClick={() => handleFilterClick(FILTER_DELETED)}
      >
        已刪除
      </button>
    </div>
  );
};

export default Filter;
