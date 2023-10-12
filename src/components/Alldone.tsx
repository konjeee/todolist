import React from "react";
import { Todo } from "../types/todo";

interface AlldoneProps {
  todos: Todo[];
}

const Alldone: React.FC<AlldoneProps> = ({ todos }) => {
  return todos.every((todo) => todo.deleted === true) ? (
    <h3 className="alldone">All Done!</h3>
  ) : (
    undefined
  );
};

export default Alldone;
