import React, { useState } from "react";

export default function Timer({ roomPreferences }) {
  const [timerText, setTimerText] = useState("");
  const [breakState, setBreakState] = useState(false);
  let workTimeSeconds = roomPreferences.workTime * 60;
  let breakTimeSeconds = roomPreferences.breakTime * 60;
  const startWorkTimer = (workTime) => {
    setInterval(countDown, 1000);

    function countDown() {
      console.log(workTimeSeconds, breakTimeSeconds);
      const minutes = Math.floor(workTimeSeconds / 60);
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
      if (seconds <= 0) {
        clearInterval(startWorkTimer);
        setBreakState(true);
      }
      setTimerText(`${minutes}:${seconds}`);
    }
  };
  return (
    <div>
      <h1>{timerText}</h1>
      <button onClick={startWorkTimer}>Get to work!</button>
    </div>
  );
}
