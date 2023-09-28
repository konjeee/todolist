import React from "react";
import TaskItem from "./TaskItem";
import { Todo } from "../types/types";

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, content: string, time: Date, person: string) => void;
  restoreTodo: (id: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  updateTodo,
  restoreTodo,
  setTodos
}) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TaskItem
          key={todo.id}
          todo={todo}
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
          restoreTodo={restoreTodo}
          setTodos={setTodos}
        />
      ))}
    </ul>
  );
};

export default TodoList;
