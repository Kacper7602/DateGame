import React, { useState } from 'react';
import './Modal.css';

export default function Modal({
  actionName,
  isOpen,
  onClose,
  minYear,
  maxYear,
  setMinYear,
  setMaxYear,
  isTimeGame,
  selectedPack,
  handlePackChange,
  questionCount,
  setQuestionCount,
  showBack = false,
  onExit
}) {
  const [localMin, setLocalMin] = useState(minYear);
  const [localMax, setLocalMax] = useState(maxYear);
  const [error, setError] = useState('');
  

  const handleSave = () => {
    if (localMin >= localMax) {
      setError('Prawy koniec przedziału musi być większy od lewego');
    } else if (localMin < 1 || localMax > 2100) {
      setError('Możliwy przedział lat (1 - 2100)');
    } else {
      setError('');
      setMinYear(localMin);
      setMaxYear(localMax);
      onClose();
    }
  };

  const handleClose = () => {
  onClose();
  if (isTimeGame) {
    onExit();
  }
}
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="backBtn" onClick={handleClose}>Wróć</button>
        <h2>Opcje</h2>
        <p>Podaj przedział dat</p>
        <div className="yearInputBox">
          <input
            type="number"
            value={localMin}
            onChange={(e) => setLocalMin(parseInt(e.target.value))}
          />
          <span>-</span>
          <input
            type="number"
            value={localMax}
            onChange={(e) => setLocalMax(parseInt(e.target.value))}
          />
        </div>
        {
         isTimeGame ? 
         <div className="rangeBox">
            <label htmlFor="rangeInput">Ilość dat:  {questionCount}</label>
            <input
              type="range"
              id="rangeInput"
              min="1"
              max="20"
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            />
          </div>
          : <div className="selectPack">
           <label htmlFor="imagePack">Zdjęcia zakrywające:</label>
           <select id="imagePack" name="imagePack" value={selectedPack} onChange={handlePackChange}>
             <option value="Znaki-zapytania">Znaki-zapytania</option>
             <option value="Pieski">Pieski</option>
             {/* Możemy dodać kolejne paczki */}
           </select>
          </div>
        }
        {error && <p className="error">{error}</p>}
        <button className="saveBtn" onClick={handleSave}>
          {actionName}
        </button>
      </div>
    </div>
  );
}
