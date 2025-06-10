import React, { useState } from 'react';
import './DateCard.css';
import { getRandomDate, getDayOfWeek } from '../../utils/dateUtils';
import { POLISH_MONTHS, POLISH_DAYS } from '../../utils/constants';

export default function DateCard({ minYear, maxYear, onReveal, onResetCalendar, selectedPack, handlePackChange }) {
  const [date, setDate] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [imageIndex, setImageIndex] = useState(1);

  const handleRandom = () => {
    const newDate = getRandomDate(minYear, maxYear);
    setDate(newDate);
    setImageIndex(Math.floor(Math.random() * 6) + 1);
    setRevealed(false);
     onResetCalendar?.();
  };

  const handleReveal = () => {
    const dayOfWeek = getDayOfWeek(date);
    setRevealed(true);
    if (onReveal) {
      onReveal({ date, dayOfWeek });
    }
  };

  return (
    <div className="date-card">
      <p className="date-text">
        {date
          ? `${date.day} ${POLISH_MONTHS[date.month].name} ${date.year}`
          : '[data]'}
      </p>

      <button className="randomBtn" onClick={handleRandom}>
        Losuj datę
      </button>

      <div className="image-area">
        {!revealed ? (
          <img src={`/img/${selectedPack}/${selectedPack}${imageIndex}.jpg`} alt="?" />
        ) : (
          <p className="day-text">{POLISH_DAYS[getDayOfWeek(date)]}</p>
        )}
      </div>

      <button className="showBtn" onClick={handleReveal} disabled={!date}>
        Odkryj
      </button>
    </div>
  );
}
