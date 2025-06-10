import React, { useState, useEffect } from 'react';
import './TimedMode.css';
import { getRandomDate, getDayOfWeek } from '../../utils/dateUtils';
import { POLISH_DAYS, POLISH_MONTHS } from '../../utils/constants';
import Modal from '../Modal/Modal';

export default function TimedMode({ onExit }) {
  const [minYear, setMinYear] = useState(2000);
  const [maxYear, setMaxYear] = useState(2030);
  const [questionCount, setQuestionCount] = useState(5);
  const [current, setCurrent] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(true);

  const [elapsedTime, setElapsedTime] = useState(0);
  const [showPenalty, setShowPenalty] = useState(false);

  useEffect(() => {
  let interval = null;

  if (startTime && !endTime) {
    interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);
  }

  return () => clearInterval(interval);
}, [startTime, endTime]);


  useEffect(() => {
    if (!modalOpen && questions.length === 0) {
      const generated = [];
      for (let i = 0; i < questionCount; i++) {
        const date = getRandomDate(minYear, maxYear);
        const answer = getDayOfWeek(date);
        generated.push({ ...date, answer });
      }
      setQuestions(generated);
      setStartTime(Date.now());
    }
  }, [modalOpen]);

  const currentQ = questions[current] ?? null;

  const handleAnswer = (index) => {
    setSelected(index);
    if (index !== currentQ.answer) {
      setStartTime((prev) => prev - 10000); // ⬅️    przesuwamy start o 10s wstecz
      setShowPenalty(true);
      setTimeout(() => setShowPenalty(false), 1000); //     ukrywamy animację po 1s
    }

    setTimeout(() => {
      setSelected(null);
      if (current + 1 < questionCount) {
        setCurrent(current + 1);
      } else {
        setEndTime(Date.now());
      }
    }, 1000);
  };

  const handleRestart = () => {
    setQuestions([]);
    setCurrent(0);
    setEndTime(null);
    setModalOpen(true);
  };

  if (modalOpen) {
    return (
      <Modal
        actionName={"Zacznij grę"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        minYear={minYear}
        maxYear={maxYear}
        setMinYear={setMinYear}
        setMaxYear={setMaxYear}
        questionCount={questionCount}
        setQuestionCount={setQuestionCount}
        isTimeGame={true}
        showBack={true}
        onExit={onExit}
      />
    );
  }

  if (endTime) {
    const seconds = ((endTime - startTime) / 1000).toFixed(2);
    return (
      <div className="timed-mode timed-mode-end">
        <h2>Twój czas: {seconds}s</h2>
        <button onClick={handleRestart}>Zagraj ponownie</button>
        <button onClick={onExit}>Powrót</button>
      </div>
    );
  }
if (!currentQ) {
  return <div className="timed-mode">Ładowanie pytania...</div>;
}

return (
  <div className="timed-mode">
    <button className="exit-btn" onClick={onExit}>Wyjdź</button>
    <div className="info">
      <p className="info-questions">
        Data {current + 1} z {questionCount}
      </p>
      <p className="timer">
        Czas: {(elapsedTime / 1000).toFixed(2)} s
        {/* Czas: 2.22 s */}
      </p>
      {showPenalty && <p className="penalty-animation">+10s</p>}
    </div>
    <h2>
      {currentQ.day} {POLISH_MONTHS[currentQ.month].name} {currentQ.year}
    </h2>
    <div className="answers">
      {POLISH_DAYS.map((day, i) => {
        let className = 'day-button';
        if (selected !== null) {
          if (i === currentQ.answer) className += ' correct';
          else if (i === selected) className += ' incorrect';
          else className += ' hidden';
        }

        return (
          <button
            key={i}
            className={className}
            onClick={() => handleAnswer(i)}
            disabled={selected !== null}
          >
            {day}
          </button>
        );
      })}
    </div>
  </div>
);

}
