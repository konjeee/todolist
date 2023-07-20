import React, { useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import Search from "./components/Search";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  content: string;
  time: string;
  person: string;
  completed: boolean;
  deleted: boolean;
}

const App: React.FC = () => {
  // 待辦事項列表的狀態
  const [todos, setTodos] = useState<Todo[]>([]);
  // 過濾狀態
  const [filter, setFilter] = useState<string>("");
  // 搜尋關鍵字的狀態
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // 新增待辦事項
  const addTodo = (content: string, time: string, person: string) => {
    const newTodo: Todo = {
      id: uuidv4(), // 使用uuid生成唯一的id
      content,
      time,
      person,
      completed: false,
      deleted: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    localStorage.setItem("localTodos", JSON.stringify([...todos, newTodo]));
    // console.log("localStorage:", localStorage.getItem("localTodos"));
  };

  // 切換待辦事項的完成狀態
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    // console.log("switch");
  };

  // 刪除待辦事項
  const deleteTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, deleted: true } : todo
      )
    );
    // console.log("delete");
  };

  // 復原已刪除的待辦事項
  const restoreTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, deleted: false } : todo
      )
    );
    // console.log("restore");
  };

  // 更新待辦事項的內容、時間和人物
  const updateTodo = (
    id: string,
    content: string,
    time: string,
    person: string
  ) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, content, time, person } : todo
      )
    );
    // console.log("update");
  };

  // 過濾待辦事項
  const filterTodos = (filterType: string) => {
    setFilter(filterType);
    // console.log("filter");
  };

  // 搜尋待辦事項
  const searchTodo = (keyword: string) => {
    setSearchKeyword(keyword);
    // console.log("search");
  };

  // 根據過濾條件和搜尋關鍵字篩選待辦事項
  const filteredTodos = todos.filter((todo) => {
    const matchFilter =
      filter === "completed"
        ? todo.completed && !todo.deleted
        : filter === "uncompleted"
        ? !todo.completed && !todo.deleted
        : filter === "deleted"
        ? todo.deleted
        : !todo.deleted;

    const matchSearch =
      todo.content.includes(searchKeyword) ||
      todo.time.includes(searchKeyword) ||
      todo.person.includes(searchKeyword);

    return matchFilter && matchSearch;
  });

  // 處理拖放事件的函式，接收更新後的 todos 陣列
  const handleDrop = (updatedTodos: Todo[]) => {
    setTodos(updatedTodos);
  };

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
          onDrop={handleDrop} // 傳遞 handleDrop 函式給 TodoList
        />
      </div>
    </DndProvider>
  );
};

export default App;
