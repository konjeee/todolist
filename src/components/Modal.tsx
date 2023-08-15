import React, { useRef, useState } from "react";
import { Todo } from "../types/todo";
import "./Ｍodal.css";
import DatePicker from "./DatePicker/DatePicker";

interface ModalProps {
  todo: Todo;
  onSaveModal: (updatedTodo: Todo) => void;
  onCloseModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ todo, onSaveModal, onCloseModal }) => {
  const [updatedContent, setUpdatedContent] = useState(todo.content);
  const [updatedTime, setUpdatedTime] = useState<Date>(todo.time);
  const [updatedPerson, setUpdatedPerson] = useState(todo.person);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    if (updatedContent.trim() !== "" && updatedPerson.trim() !== "") {
      const updatedTodo: Todo = {
        ...todo,
        content: updatedContent,
        time: updatedTime,
        person: updatedPerson,
      };
      onSaveModal(updatedTodo);
    }
  };

  const handleCancel = () => {
    onCloseModal();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleTimeChange = (date: Date) => {
    setUpdatedTime(date);
  };

  return (
    <div className="modal-overlay" onClick={handleCancel} ref={overlayRef}>
      <div className="modal" onClick={handleContentClick} ref={modalRef}>
        <div className="modal-header">編輯</div>
        <hr />
        <div className="modal-content">
          <div className="modal-row">
            <p>標題：</p>
            <input
              type="text"
              value={updatedContent}
              onChange={(e) => setUpdatedContent(e.target.value)}
              autoFocus
            />
          </div>
          <div className="modal-row">
            <p>日期：</p>
            <DatePicker selectDate={handleTimeChange} />
          </div>
          <div className="modal-row">
            <p>人物：</p>
            <input
              type="text"
              value={updatedPerson}
              onChange={(e) => setUpdatedPerson(e.target.value)}
            />
          </div>
        </div>
        <hr />
        <div className="modal-footer">
          <button className="modal-save" onClick={handleSave}>
            儲存
          </button>
          <button className="modal-close" onClick={handleCancel}>
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
