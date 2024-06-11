import { useState } from "react";

import Player from "./components/Player";
import GameOver from "./components/GameOver";
import GameBoard from "./components/GameBoard";

import { WINNING_COMBINATIONS } from "./winningCombinations";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveWinner(gameboard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameboard[combination[0].row][combination[0].column];
    const scndSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdSymbol = gameboard[combination[2].row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol === scndSymbol &&
      firstSymbol === thirdSymbol
    )
      winner = players[firstSymbol];
  }
  return winner;
}

function deriveGameboard(gameTurns) {
  // creating deep copy of 2D array
  let gameboard = [...INITIAL_GAME_BOARD.map((innerArr) => [...innerArr])];
  if (gameTurns.length > 0) {
    for (const turn of gameTurns) {
      const { square, symbol } = turn;
      const { row, col } = square;
      gameboard[row][col] = symbol;
    }
  }
  return gameboard;
}

function App() {
  const [activeSymbol, setActiveSymbol] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  const gameboard = deriveGameboard(gameTurns);
  const winner = deriveWinner(gameboard, players);

  function handleSelectSquare(rowIndex, colIndex) {
    setActiveSymbol((prevSymbol) => (prevSymbol === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentSymbol = "X";
      if (prevTurns.length > 0 && prevTurns[0].symbol === currentSymbol)
        currentSymbol = "O";
      return [
        { square: { row: rowIndex, col: colIndex }, symbol: currentSymbol },
        ...prevTurns,
      ];
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  let hasDraw;
  if (gameTurns.length == 9 && !winner) hasDraw = true;

  function handlePlayerNameChange(symbol, name) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: name };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activeSymbol === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activeSymbol === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSquareSelect={handleSelectSquare} board={gameboard} />
      </div>
    </main>
  );
}

export default App;
