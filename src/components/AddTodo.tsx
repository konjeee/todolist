import React, { useState } from 'react';

interface AddTodoProps {
    addTodo: (content: string, time: string, person: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
    const [content, setContent] = useState('');
    const [time, setTime] = useState('');
    const [person, setPerson] = useState('');

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim() !== '' && time.trim() !== '' && person.trim() !== '') {
        addTodo(content, time, person);
        setContent('');
        setTime('');
        setPerson('');
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={content} onChange={handleContentChange} placeholder="內容" />
      <input type="text" value={time} onChange={handleTimeChange} placeholder="時間" />
      <input type="text" value={person} onChange={handlePersonChange} placeholder="人物" />
      <button type="submit">新增</button>
    </form>
  );
};

export default AddTodo;