import { useState } from "react";
import Calendar from "./Calendar";
import "./datepicker.css";
import dayjs from "dayjs";

interface DatePickerProps {
  selectDate: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateChange = (date: Date) => {
    selectDate(date);
    setSelectedDate(date);
    toggleCalendar();
  };

  return (
    <div className="datepicker">
      <input
        type="text"
        value={dayjs(selectedDate).format("YYYY-MM-DD")}
        readOnly
        onClick={toggleCalendar}
      />
      {showCalendar && (
        <div className="calendar-container">
          <Calendar onSelectDate={handleDateChange} />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
