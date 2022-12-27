import React, { useEffect, useState } from "react";
import "./TicTacToe.css";
import { getBestMove, checkWin } from "./utils/utils";

const TicTacToe = () => {
  const [turn, setTurn] = useState("o");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();

  const handleClick = (num) => {
    if (cells[num] !== "") {
      alert("already clicked");
      return;
    }

    let squares = [...cells];
    squares[num] = "o";
    const isWinner = checkWin(squares, "o");
    isWinner && setWinner("o");
    setCells(squares);
    setTurn("x");
  };

  useEffect(() => {
    if (turn === "x") {
      let squares = [...cells];
      const move = getBestMove(cells, "x");
      console.log(move);
      // squares[1] = "x";
      const isWinner = checkWin(squares, "x");
      isWinner && setWinner("x");
      setTurn("o");
      setCells(squares);
    }
  }, [turn, cells]);

  const resetBoard = () => {
    setCells(Array(9).fill(""));
  };

  const handleRestart = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  };

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
  };

  return (
    <div className="container">
      <table>
        Turn: {turn}
        <button className="resetbutton" onClick={() => resetBoard()}>
          Play Again
        </button>
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      {winner && (
        <>
          <p>{winner} is the winner!</p>
          <button onClick={() => handleRestart()}>Play Again</button>
        </>
      )}
    </div>
  );
};

export default TicTacToe;
