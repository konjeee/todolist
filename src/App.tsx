import React, { useState, useEffect } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import Search from "./components/Search";
import Modal from "./components/Modal";
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

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<FilterType>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    localStorage.setItem("localTodos", JSON.stringify(todos));
  }, [todos]);

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

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, deleted: true } : todo
      )
    );
  };

  const restoreTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, deleted: false } : todo
      )
    );
  };

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

  const filterTodos = (filterType: FilterType) => {
    setFilter(filterType);
  };

  const searchTodo = (keyword: string) => {
    setSearchKeyword(keyword);
  };

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

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleCloseModal = () => {
    setEditingTodo(null);
  };

  const handleSaveModal = (updatedTodo: Todo) => {
    if (updatedTodo) {
      updateTodo(
        updatedTodo.id,
        updatedTodo.content,
        updatedTodo.time,
        updatedTodo.person
      );
      handleCloseModal();
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h1>Todo List</h1>
        <AddTodo addTodo={addTodo} />
        <Search searchTodo={searchTodo} />
        <Filter filterTodos={filterTodos} />
        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          onEditTodo={handleEditTodo}
          restoreTodo={restoreTodo}
          setTodos={setTodos}
        />

        {editingTodo && (
          <Modal
            todo={editingTodo}
            onSaveModal={handleSaveModal}
            onCloseModal={handleCloseModal}
          />
        )}
      </div>
    </DndProvider>
  );
};

export default App;
