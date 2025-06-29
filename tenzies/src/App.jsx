import React from 'react'
import Die from "./Die"
import {nanoid} from "nanoid"

export default function App() {

  const [dice, setDice] = React.useState(generateAllNewDice())

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
        setDice(prevDie => prevDie.map(
            die => die.isHeld ? die : {...die, value:Math.ceil(Math.random() * 6)}
        ))
    }

    function hold(id){
        setDice(prevDie => prevDie.map(
            die => die.id === id ? {...die, isHeld: !die.isHeld} : die
        ))
        // console.log(id)
    }

    const diceElements = dice.map(dieObj =>
      <Die key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
      /> )

    return (
        <main>
            <div className="dice-container">
                {diceElements}
            </div>

            <button className='roll-dice' onClick={RollingDice}>Roll</button>
        </main>
    )
}