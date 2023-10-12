import React, { useState } from "react";
import DatePicker from "./DatePicker/DatePicker";
import dayjs from "dayjs";

interface AddTodoProps {
  addTodo: (content: string, time: Date, person: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [content, setContent] = useState("");
  const [time, setTime] = useState(dayjs().toDate());
  const [person, setPerson] = useState("");

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleTimeChange = (date: Date) => {
    setTime(date);
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim() !== "" && time && person.trim() !== "") {
      addTodo(content, time, person);
      setContent("");
      setPerson("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <input
        className="addcontent"
        type="text"
        value={content}
        onChange={handleContentChange}
        placeholder="內容"
        autoFocus
        required
      />
      <div className="addtime">
        <DatePicker selectDate={handleTimeChange} />
      </div>
      <input
        className="addpeople"
        type="text"
        value={person}
        onChange={handlePersonChange}
        placeholder="人物"
        required
      />
      <button className="addbtn" type="submit">
        新增
      </button>
    </form>
  );
};

export default AddTodo;
