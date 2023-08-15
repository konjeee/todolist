import dayjs from "dayjs";
import React, { useState } from "react";
import {
  generateDate,
  months,
  weeks,
  generateYear,
} from "../../utils/calendar";
import cn from "../../utils/cn";
import "./calendar.css";

interface CalendarProps {
  onSelectDate: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onSelectDate }) => {
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const [showDate, setShowDate] = useState(true);
  const [showMonth, setShowMonth] = useState(false);
  const [showYear, setShowYear] = useState(false);

  const startYear = today.year() - (today.year() % 10);
  const endYear = startYear + 9;
  const years = generateYear(startYear - 1, endYear + 1);

  const handleToDate = () => {
    setShowDate(true);
    setShowMonth(false);
    setShowYear(false);
  };

  const handleToMonth = () => {
    setShowMonth(true);
    setShowDate(false);
    setShowYear(false);
  };

  const handleToYear = () => {
    setShowYear(true);
    setShowDate(false);
    setShowMonth(false);
  };

  return (
    <div className="calandar">
      {showDate && (
        <>
          <div className="header">
            <p
              className="backfoward"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            >
              &lt;
            </p>
            <h2 className="head" onClick={handleToMonth}>
              {months[today.month()]}, {today.year()}
            </h2>
            <p
              className="backfoward"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            >
              &gt;
            </p>
          </div>
          <div className="weeks">
            {weeks.map((day, index) => {
              return (
                <h1 key={index} className="week">
                  {day}
                </h1>
              );
            })}
          </div>
          <div className="datetable">
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, today }, index) => {
                return (
                  <div key={index} className="date">
                    <p
                      className={cn(
                        currentMonth ? "" : "falseCurrentMonth",
                        today ? "trueToday" : "",
                        selectDate.toDate().toDateString() ===
                          date.toDate().toDateString()
                          ? "trueSelectDate"
                          : "",
                        "dateselected"
                      )}
                      onClick={() => {
                        setSelectDate(date);
                        onSelectDate(date.toDate());
                      }}
                    >
                      {date.date()}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </>
      )}

      {showMonth && (
        <>
          <div className="header">
            <p
              className="backfoward"
              onClick={() => {
                setToday(today.year(today.year() - 1));
              }}
            >
              &lt;
            </p>
            <h2 className="head" onClick={handleToYear}>
              {today.year()}
            </h2>
            <p
              className="backfoward"
              onClick={() => {
                setToday(today.year(today.year() + 1));
              }}
            >
              &gt;
            </p>
          </div>
          <div className="monthtable">
            {months.map((month, index) => (
              <div key={index} className="month">
                <p
                  key={index}
                  className={cn(
                    selectDate.month() === index ? "trueSelectDate" : "",
                    "selected"
                  )}
                  onClick={() => {
                    setToday(today.month(index));
                    setSelectDate(today.month(index));
                    handleToDate();
                  }}
                >
                  {month}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {showYear && (
        <>
          <div className="header">
            <p
              className="backfoward"
              onClick={() => {
                setToday(today.year(today.year() - 10));
              }}
            >
              &lt;
            </p>
            <h2 className="head">
              {startYear} ~ {endYear}
            </h2>
            <p
              className="backfoward"
              onClick={() => {
                setToday(today.year(today.year() + 10));
              }}
            >
              &gt;
            </p>
          </div>
          <div className="yeartable">
            {years.map((year) => (
              <div key={year} className="year">
                <p
                  key={year}
                  className={cn(
                    year === years[0] ? "falseCurrentMonth" : "",
                    year === years[years.length - 1] ? "falseCurrentMonth" : "",
                    selectDate.year() === year ? "trueSelectDate" : "",
                    "selected"
                  )}
                  onClick={() => {
                    setToday(today.year(year));
                    setSelectDate(today.year(year));
                    handleToMonth();
                  }}
                >
                  {year}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
