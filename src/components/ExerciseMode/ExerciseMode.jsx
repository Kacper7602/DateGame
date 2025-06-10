import React, { useState } from 'react';
import './ExerciseMode.css';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import Modal from '../Modal/Modal';
import DateCard from '../DateCard/DateCard';
import Calendar from '../Calendar/Calendar';

export default function ExerciseMode({ onExit }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [minYear, setMinYear] = useState(2000);
  const [maxYear, setMaxYear] = useState(2030);
  const [dateInfo, setDateInfo] = useState(null);
  const [revealCalendar, setRevealCalendar] = useState(false);

  const [selectedPack, setSelectedPack] = useState('Znaki-zapytania');
  
    const handlePackChange = (event) => {
      setSelectedPack(event.target.value);
    };
  



  return (
    <div className="exercise-mode">
      <button className="exit-btn" onClick={onExit}>Wyjdź</button>
      <HamburgerMenu onOpen={() => setModalOpen(true)} />
      
      <DateCard
        minYear={minYear}
        maxYear={maxYear}
        onResetCalendar={() => setRevealCalendar(false)}
        onReveal={(info) => {
          setDateInfo(info); // info = { date, dayOfWeek }
          setRevealCalendar(true);
        }}
        selectedPack={selectedPack}
        handlePackChange={handlePackChange}
      />

      {revealCalendar && dateInfo?.date && (
        <Calendar date={dateInfo.date} dayOfWeek={dateInfo.dayOfWeek} />
      )}

      <Modal
        actionName={"Zapisz"}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        minYear={minYear}
        maxYear={maxYear}
        setMinYear={setMinYear}
        setMaxYear={setMaxYear}
        selectedPack={selectedPack}
        handlePackChange={handlePackChange}
        showBack={true}
        onExit={onExit}
      />
    </div>
  );
}
