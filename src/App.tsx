import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import Search from "./components/Search";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./types/types";
import { formatDate } from "./types/convertdate";
import {
  FilterType,
  FILTER_COMPLETED,
  FILTER_DELETED,
  FILTER_UNCOMPLETED,
} from "./types/filtertype";

const App: React.FC = () => {
  const initialTodos: Todo[] = JSON.parse(
    localStorage.getItem("localTodos") || "[]"
  );
  // 待辦事項列表的狀態
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  // 過濾狀態
  const [filter, setFilter] = useState<FilterType>();
  // 搜尋關鍵字的狀態
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // 每當 todos 狀態改變時更新 localStorage
  useEffect(() => {
    localStorage.setItem("localTodos", JSON.stringify(todos));
  }, [todos]);

  // 新增待辦事項
  const addTodo = (content: string, time: Date, person: string) => {
    const newTodo: Todo = {
      id: uuidv4(), // 使用uuid生成唯一的id
      content,
      time,
      person,
      completed: false,
      deleted: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  // 切換待辦事項的完成狀態
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 刪除待辦事項
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, deleted: true } : todo
      )
    );
  };

  // 復原已刪除的待辦事項
  const restoreTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, deleted: false } : todo
      )
    );
  };

  // 更新待辦事項的內容、時間和人物
  const updateTodo = (
    id: string,
    content: string,
    time: Date,
    person: string
  ) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, content, time, person } : todo
      )
    );
  };

  // 過濾待辦事項
  const filterTodos = (filterType: FilterType) => {
    setFilter(filterType);
  };

  // 搜尋待辦事項
  const searchTodo = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  // 根據過濾條件和搜尋關鍵字篩選待辦事項
  const filteredTodos = todos.filter((todo) => {
    const matchFilter =
      filter === FILTER_COMPLETED
        ? todo.completed && !todo.deleted
        : filter === FILTER_UNCOMPLETED
        ? !todo.completed && !todo.deleted
        : filter === FILTER_DELETED
        ? todo.deleted
        : !todo.deleted;

    const matchSearch =
      todo.content.includes(searchKeyword) ||
      formatDate(new Date(todo.time)).includes(searchKeyword) ||
      todo.person.includes(searchKeyword);

    return matchFilter && matchSearch;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>Todo List</h1>
        {/* 新增待辦事項的組件 */}
        <AddTodo addTodo={addTodo} />
        {/* 搜尋待辦事項的組件 */}
        <Search searchTodo={searchTodo} />
        {/* 過濾待辦事項的組件 */}
        <Filter filterTodos={filterTodos} />
        {/* 顯示待辦事項的組件 */}
        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
          restoreTodo={restoreTodo}
          setTodos={setTodos}
        />
      </div>
    </DndProvider>
  );
};

export default App;
