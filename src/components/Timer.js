import React, { useState } from "react";

export default function Timer({ roomPreferences }) {
  const [timerText, setTimerText] = useState("");
  const [breakState, setBreakState] = useState(false);
  const [workState, setWorkState] = useState(false);
  let workTimeSeconds = roomPreferences.workTime * 60;
  let breakTimeSeconds = roomPreferences.breakTime * 60;

  const startWorkTimer = () => {
    setWorkState(true);

    const countDown = () => {
      let minutes;
      let seconds;
      if (workTimeSeconds % 60 === 0) {
        minutes = Math.floor(workTimeSeconds / 60) - 1;
        seconds = 59;
      } else {
        minutes = Math.floor(workTimeSeconds / 60);
        seconds = workTimeSeconds % 60;
      }
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
      if (seconds <= 0) {
        clearInterval(workInterval);
        setBreakState(true);
      }
      setTimerText(`${minutes}:${seconds}`);
    };

    const workInterval = setInterval(countDown, 1000);
  };
  const breakTimer = () => {
    if (breakState === false) {
      return;
    } else {
    }
  };
  return (
    <div>
      <h1>{timerText}</h1>
      <button onClick={startWorkTimer}>Get to work!</button>
    </div>
  );
}
