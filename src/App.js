import React, { useState } from 'react';
import './App.css';
import LobbyMode from './components/LobbyMode';
import GameMode from './components/GameMode';

function App() {
	const [gameMode, setGameMode] = useState(false);

	const startGame = () => {
		setGameMode(!gameMode)
	}


	return (
		<div className="App">
		  <header className="App-header">
		    <h4>Welcome to Greed</h4>
			{
				gameMode == false ? <LobbyMode startGame={startGame}/> : <GameMode />
			}



		  </header>
		</div>
	);
}

export default App;

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
