import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const App = () => {
  const [websites, setWebsites] = useState([]);
  const [dailyGoal, setDailyGoal] = useState(120);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    setWebsites([
      { hostname: 'github.com', time: 120 },
      { hostname: 'linkedin.com', time: 90 },
      { hostname: 'youtube.com', time: 150 },
    ]);
    setTotalTime(360);
  }, []);

  const handleGoalChange = (e) => {
    setDailyGoal(Number(e.target.value));
  };

  const timeLeft = Math.max(0, dailyGoal - Math.floor(totalTime / 60));

  return (
    <div className="container">
      <h1>Productivity Tracker</h1>
      <div className="goal-section">
        <label>
          Daily Goal (minutes):{' '}
          <input
            type="number"
            value={dailyGoal}
            onChange={handleGoalChange}
            className="goal-input"
          />
        </label>
        <p>
          Total Time Spent: <strong>{Math.floor(totalTime / 60)} minutes</strong>
        </p>
        <p>
          Time Left: <strong>{timeLeft} minutes</strong>
        </p>
      </div>
      <h2>Websites Tracked</h2>
      <ul className="website-list">
        {websites.map(({ hostname, time }) => (
          <li key={hostname} className="website-item">
            <span className="website-name">{hostname}</span>
            <span className="website-time">{Math.floor(time / 60)} minutes</span>
          </li>
        ))}
      </ul>
    </div>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
