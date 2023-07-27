import React, { useState } from 'react';

interface AddTodoProps {
  addTodo: (content: string, time: Date, person: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [content, setContent] = useState('');
  const [time, setTime] = useState<Date | null>(null);
  const [person, setPerson] = useState('');

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setTime(selectedDate);
  };

  const handlePersonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPerson(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content.trim() !== '' && time && person.trim() !== '') {
      addTodo(content, time, person);
      setContent('');
      setTime(null);
      setPerson('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className='form-group'>
      <input type="text" value={content} onChange={handleContentChange} placeholder="內容" autoFocus/>
      <input type="date" value={time ? time.toISOString().split('T')[0] : ''} onChange={handleTimeChange} placeholder="時間" />
      <input type="text" value={person} onChange={handlePersonChange} placeholder="人物" />
      <button type="submit">新增</button>
    </form>
  );
};

export default AddTodo;
