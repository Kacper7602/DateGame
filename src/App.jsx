import React, { useState } from 'react';
import GameModeSelector from './components/GameModeSelector/GameModeSelector';
import ExerciseMode from './components/ExerciseMode/ExerciseMode';
import TimedMode from './components/TimedMode/TimedMode';

export default function App() {
  const [gameMode, setGameMode] = useState(null); // null, 'exercise', 'timed'

  const handleModeSelect = (mode) => {
    setGameMode(mode);
  };

  const handleReturnToMenu = () => {
    setGameMode(null);
  };

  return (
    <div className="app">
      {gameMode === null && <GameModeSelector onSelect={handleModeSelect} />}
      {gameMode === 'exercise' && <ExerciseMode onExit={handleReturnToMenu} />}
      {gameMode === 'timed' && <TimedMode onExit={handleReturnToMenu} />}
    </div>
  );
}
