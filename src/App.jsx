import { useState } from 'react';
import './App.css';

function App() {
  const [total, setTotal] = useState(0);
  const [extra, setExtra] = useState(0);
  const [endScore, setEndScore] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [over, setOver] = useState(0);
  const [ball, setBall] = useState(0);

  const players = [
    { id: 1, name: 'SKY', score: 0, isOut: false },
    { id: 2, name: 'Auto', score: 0, isOut: false },
    { id: 3, name: 'Cat', score: 0, isOut: false },
    { id: 4, name: 'Sharath', score: 0, isOut: false },
    { id: 5, name: 'Pathirani', score: 0, isOut: false },
    {id: 6, name:'bot bala',score: 0, isOut:false},
  ];

  const [playerStats, setPlayerStats] = useState(players);

  const updateOver = () => {
    setBall((prev) => prev + 1);
    if (ball + 1 === 6) {
      setOver((prev) => prev + 1);
      setBall(0);
      setTotal((prevTotal) => prevTotal + extra); 
    }
  };

  const handleScore = (playerId, runs) => {
    setPlayerStats((prevStats) =>
      prevStats.map((player) =>
        player.id === playerId && !player.isOut
          ? { ...player, score: player.score + runs }
          : player
      )
    );
    setTotal((prevTotal) => prevTotal + runs);
    updateOver();
  };

  const handleOut = (playerId) => {
    setPlayerStats((prevStats) =>
      prevStats.map((player) =>
        player.id === playerId ? { ...player, isOut: true } : player
      )
    );
    setWicket((prev) => prev + 1);
    updateOver();
  };

  const handleExtras = () => {
    setExtra((prevExtra) => prevExtra + 1);
    setTotal((prevTotal) => prevTotal + 1);
  };

  const endGame = () => {
    setEndScore(total + extra);
  };

  const resetGame = () => {
    setPlayerStats(players);
    setTotal(0);
    setExtra(0);
    setEndScore(0);
    setWicket(0);
    setOver(0);
    setBall(0);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Street Cricket Warriors</h1>
        <h2>Score Board</h2>
      </header>
      <main>
        <div className="score-info">
          <p>Total Score: {total}</p>
          <p>Wickets: {wicket}</p>
          <p>Overs: {over}.{ball}</p>
          <p>Extras: {extra}</p>
        </div>

        <div className="player-section">
          {playerStats.map((player) => (
            <div key={player.id} className="player-card">
              <h3>{player.name}</h3>
              <p>Score: {player.score}</p>
              <p>Status: {player.isOut ? 'Out' : 'Not Out'}</p>
              {!player.isOut && (
                <div className="button-group">
                  <button onClick={() => handleScore(player.id, 1)}>Single</button>
                  <button onClick={() => handleScore(player.id, 2)}>Double</button>
                  <button onClick={() => handleScore(player.id, 4)}>Four</button>
                  <button onClick={() => handleScore(player.id, 6)}>Six</button>
                  <button onClick={() => handleOut(player.id)}>Out</button>
                </div>
              )}
              {player.isOut && player.score == 0 && <p>Vaathu Mutta</p>}
              {player.isOut && <p>Player is out </p>}
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button onClick={handleExtras}>Add Extra</button>
          <button onClick={resetGame}>Reset Game</button>
        </div>
      </main>
    </div>
  );
}

export default App;