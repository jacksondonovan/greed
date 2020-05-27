import React from 'react';

function LobbyMode({ startGame }) {
  return (
    <div className="LobbyMode">
      <h5>Press Play</h5>
	  <button onClick={startGame}>PLAY</button>
    </div>
  );
}

export default LobbyMode;
