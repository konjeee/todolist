import React, { useState } from "react";
import { useDrag } from "react-dnd";

interface TaskItemProps {
  todo: {
    id: string;
    content: string;
    time: string;
    person: string;
    completed: boolean;
    deleted: boolean;
  };
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (
    id: string,
    content: string,
    time: string,
    person: string
  ) => void;
  restoreTodo: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
  updateTodo,
  restoreTodo,
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
      updatedTime.trim() !== "" &&
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

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK_ITEM",
    item: todo,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <li ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
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
            value={updatedTime}
            onChange={(e) => setUpdatedTime(e.target.value)}
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
            {todo.content} - {todo.time} - {todo.person}
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
