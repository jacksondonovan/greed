import React, { useState } from 'react';
import face_one from '../images/die-face-one.png';
import face_two from '../images/die-face-two.png';
import face_three from '../images/die-face-three.png';
import face_four from '../images/die-face-four.png';
import face_five from '../images/die-face-five.png';
import face_six from '../images/die-face-six.png';

function DiceCollection({ updateScore }) {
	let [firstDie, setFirstDie] = useState(face_one)
	let [secondDie, setSecondDie] = useState(face_two)
	let [thirdDie, setThirdDie] = useState(face_three)
	let [fourthDie, setFourthDie] = useState(face_four)
	let [fifthDie, setFifthDie] = useState(face_five)
	let [sixthDie, setSixthDie] = useState(face_six)
	let [rollScore, setRollScore] = useState(0)
	let [isTurnActive, setIsTurnActive] = useState(false)

	function updateDie(roll, updateFunction) {
		if(roll == 1) {
			updateFunction(face_one)
		}
		else if(roll == 2) {
			updateFunction(face_two)
		}
		else if(roll == 3) {
			updateFunction(face_three)
		}
		else if(roll == 4) {
			updateFunction(face_four)
		}
		else if(roll == 5) {
			updateFunction(face_five)
		}
		else if(roll == 6) {
			updateFunction(face_six)
		}

	}
	function resetDice() {
		setFirstDie(face_one)
		setSecondDie(face_two)
		setThirdDie(face_three)
		setFourthDie(face_four)
		setFifthDie(face_five)
		setSixthDie(face_six)
	}

	function evaluateRoll(rolls) {
		let current_score = 0
		let score_map = {}

		for(let i = 0; i < rolls.length; i++) {
			if(score_map[rolls[i]]) {
				score_map[rolls[i]]++
			}
			else {
				score_map[rolls[i]] = 1
			}
		}

		let pips = Object.keys(score_map)
		let frequencies = Object.values(score_map)

		if(frequencies == [2, 2, 2].toString() || frequencies == [1, 1, 1, 1, 1, 1].toString()) {
			current_score += 1500
		}
		else {
			for(let i = 0; i < frequencies.length; i++) {
				if(frequencies[i] == 3) {
					current_score += (Number(pips[i]) * 100)
					pips.splice(i,1)
					frequencies.splice(i,1)
					i--
				}
				if(frequencies[i] == 4) {
					current_score += 1000
					pips.splice(i,1)
					frequencies.splice(i,1)
					i--
				}
				if(frequencies[i] == 5) {
					current_score += 2000
					pips.splice(i,1)
					frequencies.splice(i,1)
					i--
				}
				if(frequencies[i] == 6) {
					current_score += 3000
					pips.splice(i,1)
					frequencies.splice(i,1)
					i--
				}
			}
			for(let i = 0; i < pips.length; i++) {
				if(pips[i] == '1') {
					current_score += frequencies[i] * 100
				}
				else if(pips[i] == '5') {
					current_score += frequencies[i] * 50
				}
			}

		}

		return current_score
	}

	function rollDice() {
		setIsTurnActive(true)

		let rolls = [
			Math.floor(Math.random() * 6) + 1,
			Math.floor(Math.random() * 6) + 1,
			Math.floor(Math.random() * 6) + 1,
			Math.floor(Math.random() * 6) + 1,
			Math.floor(Math.random() * 6) + 1,
			Math.floor(Math.random() * 6) + 1
		]

		updateDie(rolls[0], setFirstDie)
		updateDie(rolls[1], setSecondDie)
		updateDie(rolls[2], setThirdDie)
		updateDie(rolls[3], setFourthDie)
		updateDie(rolls[4], setFifthDie)
		updateDie(rolls[5], setSixthDie)

		setRollScore(evaluateRoll(rolls))
	}

	function rollDuds() {

	}

	function bankScore() {
		updateScore(rollScore)
		setRollScore(0)
		setIsTurnActive(false)
		resetDice()
	}

	return (
		<div className="DiceCollection">
			{ isTurnActive ? <label> This roll: { rollScore } </label> : <br /> }

			<img style={{ height: 40 }} src={ firstDie } />
			<img style={{ height: 40 }} src={ secondDie } />
			<img style={{ height: 40 }} src={ thirdDie } />
			<img style={{ height: 40 }} src={ fourthDie } />
			<img style={{ height: 40 }} src={ fifthDie } />
			<img style={{ height: 40 }} src={ sixthDie } />

			{ !isTurnActive ? <button onClick={rollDice}>Roll Dice</button> : <div> <button onClick={rollDuds}>Roll Duds</button> <button onClick={bankScore}>Bank</button> </div> }

		</div>
  );
}

export default DiceCollection;
