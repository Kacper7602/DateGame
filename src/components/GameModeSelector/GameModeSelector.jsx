import React from 'react';
import './GameModeSelector.css';

export default function GameModeSelector({ onSelect }) {
  return (
    <div className="mode-selector">
      <h1>Witaj w DateGame!</h1>
      <h2>Wybierz tryb gry</h2>
      <button onClick={() => onSelect('exercise')}>Trening</button>
      <button onClick={() => onSelect('timed')}>Gra z czasem</button>
    </div>
  );
}
