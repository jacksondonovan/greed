import React, { useState } from 'react';
import DiceCollection from './DiceCollection';

function GameMode() {
	let [playerScore, setPlayerScore] = useState(0);
	let [cpuScore, setCpuScore] = useState(0);
	let [activePlayer, setActivePlayer] = useState("PLAYER");
	let [round, setRound] = useState(1);

	const updateScore = (bankedScore) => {
		if(activePlayer == "PLAYER") {
			setPlayerScore(playerScore += bankedScore)
			setActivePlayer("CPU")
		}
		if(activePlayer == "CPU") {
			setCpuScore(cpuScore += bankedScore)
			setActivePlayer("PLAYER")
			setRound(round += 1)
		}
	}

	return (
		<div className="GameMode">
			<div col="2">
				<label style={{color: "red"}}>Turn { round }</label>
				<label>Current Roller: { activePlayer }</label>

				<DiceCollection updateScore={updateScore}/>
			</div>
			<br />
			<div col="2">
				<label>Player 1</label>
				<h5>Score: { playerScore }</h5>
				<br />
				<label>CPU</label>
				<h5>Score: { cpuScore }</h5>
			</div>
		</div>
	);
}

export default GameMode;
