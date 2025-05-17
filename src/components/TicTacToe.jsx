import { useState } from "react";
import { Board } from "./Board";
import { checkWinner } from "../utils/ticTacToeUtils";

export const TicTacToe = ({ size = 3 }) => {
  const [board, setBoard] = useState(
    new Array(size).fill().map((_, index) => new Array(size).fill(null))
  );
  const [turnX, setTurnX] = useState(true);

  const winner = checkWinner(board, size);

  const status = winner
    ? `Winner is ${winner}`
    : turnX
    ? "Player X turn"
    : "Player O turn";

  const handleClick = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] || winner) {
      return;
    }
    const deepCopyOfBoard = JSON.parse(JSON.stringify(board));
    deepCopyOfBoard[rowIndex][colIndex] = turnX ? "X" : "O";
    setBoard(deepCopyOfBoard);
    setTurnX(!turnX);
  };

  const handleReset = () => {
    setBoard(
      new Array(size).fill().map((_, index) => new Array(size).fill(null))
    );
  };

  return (
    <div className="container">
      <Board handleClick={handleClick} size={size} board={board} />
      <div className="status">{status}</div>
      <button onClick={handleReset} style={{ background: "pink" }}>
        Reset
      </button>
    </div>
  );
};
