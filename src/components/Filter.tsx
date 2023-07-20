import React from 'react';

interface FilterProps {
  filterTodos: (filterType: string) => void;
}

const Filter: React.FC<FilterProps> = ({ filterTodos }) => {
  const handleFilterClick = (filterType: string) => {
    filterTodos(filterType);
  };

  return (
    <div>
      <button onClick={() => handleFilterClick('all')}>全部</button>
      <button onClick={() => handleFilterClick('completed')}>已完成</button>
      <button onClick={() => handleFilterClick('uncompleted')}>未完成</button>
      <button onClick={() => handleFilterClick('deleted')}>已刪除</button>
    </div>
  );
};

export default Filter;