import "./App.css";

import { useState } from "react";

function Square({ value, onSquareClcik }) {
  return (
    <button onClick={onSquareClcik} className="square">
      {value}
    </button>
  );
}

function MYGame() {
  const [IsNext, setIsNext] = useState(true);
  const [square, setsquare] = useState(Array(9).fill(null));
  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (IsNext ? "X" : "O");
  }
  function HandleClcick(i) {
    if (square[i] || calculateWinner(square)) {
      return;
    }
    const nextsquare = square.slice();
    if (IsNext) {
      nextsquare[i] = "X";
    } else {
      nextsquare[i] = "O";
    }
    setsquare(nextsquare);
    setIsNext(!IsNext);
  }

  return (
    <div className="perant ">
      <div className="status">{status}</div>
      <div className="My-row">
        <Square onSquareClcik={() => HandleClcick(0)} value={square[0]} />
        <Square onSquareClcik={() => HandleClcick(1)} value={square[1]} />
        <Square onSquareClcik={() => HandleClcick(2)} value={square[2]} />
      </div>
      <div className="My-row">
        <Square onSquareClcik={() => HandleClcick(3)} value={square[3]} />
        <Square onSquareClcik={() => HandleClcick(4)} value={square[4]} />
        <Square onSquareClcik={() => HandleClcick(5)} value={square[5]} />
      </div>
      <div className="My-row">
        <Square onSquareClcik={() => HandleClcick(6)} value={square[6]} />
        <Square onSquareClcik={() => HandleClcick(7)} value={square[7]} />
        <Square onSquareClcik={() => HandleClcick(8)} value={square[8]} />
      </div>
    </div>
  );
}

export default MYGame;

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
