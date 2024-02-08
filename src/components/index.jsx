import { useState } from "react";
import Board from "./Board";
import Button from "./Button";
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [move, setMove] = useState(0);
  const currentSquare = history[move];
  const xIsNext = move % 2 === 0;

  function handleClick(i) {
    if (calculateWinner(currentSquare) || currentSquare[i]) {
      return;
    }
    const nextSquares = currentSquare.slice();
    console.log(nextSquares);
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    const nextHistory = [...history.slice(0, move + 1), nextSquares];
    setMove(nextHistory.length - 1);
    setHistory(nextHistory);
  }

  // ? handle click event of game state back
  function jumpTo(move) {
    setMove(move);
  }

  const moves = history.map((squares, i) => {
    let description;
    if (i > 0) {
      description = `GO to move #${i}`;
    } else {
      description = "Start Game";
    }
    return (
      <li key={i} className="text-white">
        <button
          className="mb-2 p-3 text-white shadow shadow-[#ffffff49] hover:bg-[#111010]"
          onClick={() => jumpTo(i)}
        >
          {description}
        </button>
      </li>
    );
  });

  // *** calculate winner and next player and change the dom

  const winner = calculateWinner(currentSquare);
  const status = winner
    ? `Winner is : ${winner}`
    : `Next Player ${xIsNext ? "X" : "O"}`;
  return (
    <div className="flex min-h-screen items-center justify-center gap-7 border">
      <div>
        <p className="mb-7 text-center text-2xl font-bold text-white">
          {status}{" "}
        </p>

        <Board>
          <Button onClick={() => handleClick(0)} value={currentSquare[0]} />
          <Button onClick={() => handleClick(1)} value={currentSquare[1]} />
          <Button onClick={() => handleClick(2)} value={currentSquare[2]} />
          <Button onClick={() => handleClick(3)} value={currentSquare[3]} />
          <Button onClick={() => handleClick(4)} value={currentSquare[4]} />
          <Button onClick={() => handleClick(5)} value={currentSquare[5]} />
          <Button onClick={() => handleClick(6)} value={currentSquare[6]} />
          <Button onClick={() => handleClick(7)} value={currentSquare[7]} />
          <Button onClick={() => handleClick(8)} value={currentSquare[8]} />
        </Board>
      </div>
      <ul>{moves}</ul>
    </div>
  );
}

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
