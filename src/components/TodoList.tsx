import React, { useEffect, useRef } from "react";
import TaskItem from "./TaskItem";
import { useDrop } from "react-dnd";

interface Todo {
  id: string;
  content: string;
  time: string;
  person: string;
  completed: boolean;
  deleted: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (
    id: string,
    content: string,
    time: string,
    person: string
  ) => void;
  restoreTodo: (id: string) => void;
  onDrop: (updatedTodos: Todo[]) => void; // 新增 onDrop 屬性，處理拖放事件
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  updateTodo,
  restoreTodo,
  onDrop,
}) => {
  const dropRef = useRef<HTMLUListElement>(null); // Create a ref for the drop target
  const todosRef = useRef<Todo[]>(todos); // 使用 useRef 儲存 todos 的參考

  const [, drop] = useDrop(
    () => ({
      accept: "TASK_ITEM",
      drop: (item: Todo,monitor) => {
        const updatedTodos = [...todosRef.current]; // 使用 todosRef 的最新值
        // console.log("updatedTodos:", updatedTodos);
        const draggedItem = updatedTodos.find((todo) => todo.id === item.id);
        // console.log("draggedItem:", draggedItem);

        // console.log("monitor.didDrop():", monitor.didDrop()); //false
        // console.log("monitor.getDropResult():", monitor.getDropResult()); //null

        if (draggedItem) {
          const draggedIndex = updatedTodos.indexOf(draggedItem);
          const targetIndex = updatedTodos.findIndex(
            (todo) => todo.id === item.id
          );
          // console.log("拿取的draggedIndex:", draggedIndex);
          // console.log("放下的targetIndex:", targetIndex);

          if (draggedIndex !== targetIndex && targetIndex !== -1) {
            // 避免找到同一個 todo 的索引並確保 targetIndex 不為 -1
            updatedTodos.splice(draggedIndex, 1);
            updatedTodos.splice(targetIndex, 0, draggedItem);
            onDrop(updatedTodos);
          }
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [] // 空的依賴陣列，只在組件掛載時初始化 useDrop hook
  );

  useEffect(() => {
    // 在 todos 改變時，更新 todosRef 的值
    todosRef.current = todos;
  }, [todos]);

  useEffect(() => {
    // 在組件掛載和 dropRef 改變時，重新初始化 useDrop hook
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [dropRef.current]);

  return (
    <ul ref={dropRef}>
      {todos.map((todo) => (
        <TaskItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
          restoreTodo={restoreTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
