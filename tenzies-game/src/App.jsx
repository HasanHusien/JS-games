import "./index.css";
import Die from "./Components/Die";
import React from "react";
import { nanoid } from "nanoid"; // <= spcial and unique id for items
import swal from "sweetalert";
import Confetti from "react-confetti";

export default function () {
  function genrateAllNewDice() {
    return new Array(10).fill(0).map(() => {
      console.log("genrateAllNewDice");
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    });
  }

  const [dice, setDice] = React.useState(() => genrateAllNewDice());
  let gameOver = React.useRef(null);

  let gamWon = false;

  let allHeld = dice.every((d) => d.isHeld);
  let allSame = new Set(dice.map((d) => d.value)).size === 1; // Or dice.every(d => d.value === d[0].value)
  if (allHeld && allSame) {
    gamWon = true;
  }

  React.useEffect(() => {
    if (gamWon) {
      gameOver.current.style.backgroundColor =
        "#59e391" && gameOver.current.focus();
    }
  }, [gamWon]);

  function hold(id) {
    setDice((prev) =>
      prev.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }
  function rollDice() {
    if (!gamWon) {
      setDice((oldValue) =>
        oldValue.map((item) =>
          item.isHeld ? item : { ...item, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(() => genrateAllNewDice());
    }
  }

  return (
    <main>
      {gamWon && <Confetti width={300} height={400} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="tenzies">
        <Die hold={hold} dice={dice} />
      </div>
      <button className="roll" onClick={rollDice} ref={gameOver}>
        {gamWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
