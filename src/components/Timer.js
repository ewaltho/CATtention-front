import React, { useState } from "react";

export default function Timer({ roomPreferences }) {
  const [timerText, setTimerText] = useState("");
  const [started, setStarted] = useState(false);
  const [workState, setWorkState] = useState(false);
  let workTimeSeconds = roomPreferences.workTime * 60;
  let breakTimeSeconds = roomPreferences.breakTime * 60;

  const startWorkTimer = () => {
    setWorkState(true);

    const countDown = () => {
      let minutes = Math.floor(workTimeSeconds / 60);
      let seconds = workTimeSeconds % 60;
      switch (seconds) {
        case 1: {
          seconds = "01";
          break;
        }
        case 2: {
          seconds = "02";
          break;
        }
        case 3: {
          seconds = "03";
          break;
        }
        case 4: {
          seconds = "04";
          break;
        }
        case 5: {
          seconds = "05";
          break;
        }
        case 6: {
          seconds = "06";
          break;
        }
        case 7: {
          seconds = "07";
          break;
        }
        case 8: {
          seconds = "08";
          break;
        }
        case 9: {
          seconds = "09";
          break;
        }
        case 0: {
          seconds = "00";
          break;
        }
        default: {
          break;
        }
      }
      workTimeSeconds -= 1;
      if (workTimeSeconds <= 0) {
        clearInterval(workInterval);
        setWorkState(false);
        setStarted(true);
        breakTimer();
      }
      setTimerText(`${minutes}:${seconds}`);
    };

    const workInterval = setInterval(countDown, 1000);
  };

  const breakTimer = () => {
    const countDown = () => {
      let minutes = Math.floor(breakTimeSeconds / 60);
      let seconds = breakTimeSeconds % 60;
      switch (seconds) {
        case 1: {
          seconds = "01";
          break;
        }
        case 2: {
          seconds = "02";
          break;
        }
        case 3: {
          seconds = "03";
          break;
        }
        case 4: {
          seconds = "04";
          break;
        }
        case 5: {
          seconds = "05";
          break;
        }
        case 6: {
          seconds = "06";
          break;
        }
        case 7: {
          seconds = "07";
          break;
        }
        case 8: {
          seconds = "08";
          break;
        }
        case 9: {
          seconds = "09";
          break;
        }
        case 0: {
          seconds = "00";
          break;
        }
        default: {
          break;
        }
      }
      breakTimeSeconds -= 1;
      if (breakTimeSeconds <= 0) {
        clearInterval(breakInterval);
        setWorkState(true);
        setTimerText(`Time's Up!`);
      }
      setTimerText(`${minutes}:${seconds}`);
    };
    const breakInterval = setInterval(countDown, 1000);
  };

  return (
    <div>
      {workState ? <h1>Work Time!</h1> : <h1>Break Time</h1>}
      <h2>{timerText}</h2>
      {workState === false ? (
        <button onClick={startWorkTimer}>Get to work!</button>
      ) : (
        <button>Wait!</button>
      )}
    </div>
  );
}
