import React, { useState, useEffect, useMemo } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter/Filter";
import Search from "./components/Search";
import Modal from "./components/Modal";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./types/todo";
import { formatDate } from "./utils/time";
import {
  FilterType,
  FILTER_COMPLETED,
  FILTER_DELETED,
  FILTER_UNCOMPLETED,
} from "./components/Filter/filtertype";
import Alldone from "./components/Alldone";

const App: React.FC = () => {
  const initialTodos: Todo[] = useMemo(() => {
    return JSON.parse(localStorage.getItem("localTodos") || "[]");
  }, []);

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<FilterType>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  useEffect(() => {
    localStorage.setItem("localTodos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (content: string, time: Date, person: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
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

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      let matchFilter = false;

      if (filter === FILTER_COMPLETED) {
        matchFilter = todo.completed && !todo.deleted;
      } else if (filter === FILTER_UNCOMPLETED) {
        matchFilter = !todo.completed && !todo.deleted;
      } else if (filter === FILTER_DELETED) {
        matchFilter = todo.deleted;
      } else {
        matchFilter = !todo.deleted;
      }

      const matchSearch =
        todo.content.includes(searchKeyword) ||
        formatDate(new Date(todo.time)).includes(searchKeyword) ||
        todo.person.includes(searchKeyword);

      return matchFilter && matchSearch;
    });
  }, [todos, filter, searchKeyword]);

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
    <>
      <DndProvider backend={HTML5Backend}>
        <h1 className="logo">To-do List</h1>
        <div className="container">
          <div className="sidebar">
            <Filter filterTodos={filterTodos} />
          </div>
          <div className="main">
            <AddTodo addTodo={addTodo} />
            <Search searchTodo={searchTodo} />
            <TodoList
              todos={filteredTodos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              onEditTodo={handleEditTodo}
              restoreTodo={restoreTodo}
              setTodos={setTodos}
            />
            <Alldone todos={todos}/>

            {editingTodo && (
              <Modal
                todo={editingTodo}
                onSaveModal={handleSaveModal}
                onCloseModal={handleCloseModal}
              />
            )}
          </div>
        </div>
      </DndProvider>
    </>
  );
};

export default App;
