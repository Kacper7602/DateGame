import React from 'react';
import './Calendar.css';
import { POLISH_MONTHS } from '../../utils/constants';

export default function Calendar({ date, dayOfWeek }) {
  const { day, month, year } = date;
  const daysInWeek = ['P', 'W', 'Ś', 'C', 'P', 'S', 'N'];

  // Wyliczanie offsetu (na podstawie algorytmu)
  let pushDayYear = year + Math.floor(year / 4);
  if (year % 4 === 0 && (month === 1 || month === 2)) {
    pushDayYear--;
  }

  const offset = (POLISH_MONTHS[month].push + pushDayYear) % 7;

  const numDays = [4, 6, 9, 11].includes(month) ? 30 :
    month === 2 ? (year % 4 === 0 ? 29 : 28) : 31;

  const cells = Array(offset).fill(null).concat([...Array(numDays)].map((_, i) => i + 1));
  while (cells.length < 42) cells.push(null);

  return (
    <div className="calendar-wrapper">
      <p className="calendar-title">
        {POLISH_MONTHS[month].fullName} {year}
      </p>
      <div className="calendar-grid">
        {daysInWeek.map((d, i) => (
          <div key={`header-${i}`} className={`cell underlined header ${d === 'N' ? 'red' : ''}`}>{d}</div>
        ))}
        {cells.map((d, i) => {
          let className = 'cell';
          if (d === day) className += ' green';
          else if (i % 7 === 6) className += ' red';
          return <div key={`day-${i}`} className={className}>{d || ''}</div>;
        })}
      </div>
    </div>
  );
}
