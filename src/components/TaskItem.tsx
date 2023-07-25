import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Todo } from "../types/types";
import { formatDate } from "../types/convertdate";

interface TaskItemProps {
  todo: {
    id: string;
    content: string;
    time: Date;
    person: string;
    completed: boolean;
    deleted: boolean;
  };
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, content: string, time: Date, person: string) => void;
  restoreTodo: (id: string) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TaskItem: React.FC<TaskItemProps> = ({
  todo,
  todos,
  toggleTodo,
  deleteTodo,
  updateTodo,
  restoreTodo,
  setTodos
}) => {
  const [editing, setEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(todo.content);
  const [updatedTime, setUpdatedTime] = useState(todo.time);
  const [updatedPerson, setUpdatedPerson] = useState(todo.person);

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleSave = () => {
    if (
      updatedContent.trim() !== "" &&
      updatedTime.toString().trim() !== "" &&
      updatedPerson.trim() !== ""
    ) {
      setEditing(false);
      updateTodo(todo.id, updatedContent, updatedTime, updatedPerson);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setUpdatedContent(todo.content);
    setUpdatedTime(todo.time);
    setUpdatedPerson(todo.person);
  };

  const handleRestore = () => {
    restoreTodo(todo.id);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setUpdatedTime(selectedDate);
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
          
          if(draggedIndex !== -1 && droppedIndex !== -1){
            let changetodos = todos;
            let temp = changetodos[draggedIndex];
            changetodos[draggedIndex] = changetodos[droppedIndex];
            changetodos[droppedIndex] = temp;
            setTodos(() => changetodos)
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
    <li ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      {editing ? (
        <>
          <input
            type="text"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            autoFocus
          />
          <input
            type="date"
            value={updatedTime.toISOString().split("T")[0]}
            onChange={handleTimeChange}
          />
          <input
            type="text"
            value={updatedPerson}
            onChange={(e) => setUpdatedPerson(e.target.value)}
          />
          <button onClick={handleSave}>儲存</button>
          <button onClick={handleCancel}>取消</button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
        {todo.content} - {formatDate(new Date(todo.time))} - {todo.person}
          </span>
          {!todo.deleted && (
            <>
              <button onClick={handleEdit}>編輯</button>
              <button onClick={handleDelete}>刪除</button>
            </>
          )}
        </>
      )}
      {todo.deleted && <button onClick={handleRestore}>復原</button>}
    </li>
  );
};

export default TaskItem;
