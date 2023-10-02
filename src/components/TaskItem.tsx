import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Todo } from "../types/todo";
import { formatDate } from "../utils/time";

interface TaskItemProps {
  todo: Todo;
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  onEditTodo: (todo: Todo) => void;
  restoreTodo: (id: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TaskItem: React.FC<TaskItemProps> = ({
  todo,
  todos,
  toggleTodo,
  deleteTodo,
  onEditTodo,
  restoreTodo,
  setTodos,
}) => {
  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleEdit = () => {
    onEditTodo(todo);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleRestore = () => {
    restoreTodo(todo.id);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK_ITEM",
    item: todo,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(
    () => ({
      accept: "TASK_ITEM",
      drop: (item: Todo) => {
        let draggedItem = item;
        let droppedItem = todo;
        if (draggedItem !== droppedItem) {
          let draggedIndex = todos.indexOf(draggedItem);
          let droppedIndex = todos.indexOf(droppedItem);

          if (draggedIndex !== -1 && droppedIndex !== -1) {
            todos.splice(draggedIndex, 1);
            todos.splice(droppedIndex, 0, draggedItem);
            setTodos(() => todos);
          }
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [todos]
  );

  return (
    <li
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />

      <span
        className="todo-content"
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.content}
      </span>
      <span
        className="todo-info"
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.person}
        <br />
        Created {formatDate(new Date(todo.time))}
      </span>
      <div className="edit">
        {!todo.deleted && (
          <>
            <button onClick={handleEdit} className="editbtn">
              編輯
            </button>
            <button onClick={handleDelete} className="deletebtn">
              刪除
            </button>
          </>
        )}

        {todo.deleted && (
          <button onClick={handleRestore} className="restorebtn">
            復原
          </button>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
