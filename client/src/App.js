import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = ((hours % 12) + minutes / 60) * 30;
  const minuteAngle = (minutes + seconds / 60) * 6;
  const secondAngle = seconds * 6;

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Hello World</h1>

        <div className="digital-clock">
          {time.toLocaleTimeString('zh-CN', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>

        <svg className="analog-clock" viewBox="0 0 200 200" width="300" height="300">
          <circle cx="100" cy="100" r="98" fill="white" stroke="#333" strokeWidth="2"/>

          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 100 + 85 * Math.cos(angle);
            const y1 = 100 + 85 * Math.sin(angle);
            const x2 = 100 + 90 * Math.cos(angle);
            const y2 = 100 + 90 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#333"
                strokeWidth="2"
              />
            );
          })}

          <line
            x1="100"
            y1="100"
            x2={100 + 50 * Math.cos((hourAngle - 90) * (Math.PI / 180))}
            y2={100 + 50 * Math.sin((hourAngle - 90) * (Math.PI / 180))}
            stroke="#333"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <line
            x1="100"
            y1="100"
            x2={100 + 70 * Math.cos((minuteAngle - 90) * (Math.PI / 180))}
            y2={100 + 70 * Math.sin((minuteAngle - 90) * (Math.PI / 180))}
            stroke="#666"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <line
            x1="100"
            y1="100"
            x2={100 + 80 * Math.cos((secondAngle - 90) * (Math.PI / 180))}
            y2={100 + 80 * Math.sin((secondAngle - 90) * (Math.PI / 180))}
            stroke="#e74c3c"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <circle cx="100" cy="100" r="5" fill="#333"/>
        </svg>

        <div className="description">
          <p>这是一个基于 React + Node.js 的简单 Web 应用</p>
          <p>展示了动态时钟和 SVG 图形渲染</p>
          <p className="credit">by claude code</p>
        </div>
      </div>
    </div>
  );
}

export default App;
