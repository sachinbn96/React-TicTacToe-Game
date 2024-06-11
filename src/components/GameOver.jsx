export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner ? <p>Winner: {winner}</p> : <p>Draw!</p>}
      <button onClick={onRestart}>Rematch!</button>
    </div>
  );
}
