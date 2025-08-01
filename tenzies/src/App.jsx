import React from 'react'
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = React.useState(() => generateAllNewDice())
//   const [gameOver, setGameOver] = React.useState(false)


  const gameOver = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)
  

  function generateAllNewDice() {
        return new Array(10)
        .fill(0)
        .map(() =>({
        value:Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
  }))
    }
    
    // console.log(generateAllNewDice())

    function RollingDice(){
        if(!gameOver){
            setDice(prevDie => prevDie.map(
            die => die.isHeld ? die : {...die, value:Math.ceil(Math.random() * 6)}
        ))
        } else
            setDice(generateAllNewDice())
    }

    function hold(id){
        setDice(prevDie => prevDie.map(
            die => die.id === id ? {...die, isHeld: !die.isHeld} : die
        ))
        console.log(id)
    }

    const diceElements = dice.map(dieObj =>
      <Die key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
      /> )

    return (
        <main>
            {gameOver && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>

            <button className='roll-dice' onClick={RollingDice}>
                {gameOver ? "New Game" : "Roll"}
            </button>
        </main>
    )
}