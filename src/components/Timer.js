import React, { useState } from "react";
import Trivia from "./Trivia";
import API from "../utils/API";

export default function Timer({ roomPreferences, userObject }) {
  const [timerText, setTimerText] = useState("");
  // ! started will be used later on
  const [started, setStarted] = useState(false);
  const [workState, setWorkState] = useState(false);
  const [breakState, setBreakState] = useState(false);

  // Grab our work and break seconds from roomprefs on previous page
  // todo: There is a bug with a user entering something that will not be "cleanly" divisible. We need to control these inputs on the previous page.
  let workTimeSeconds = roomPreferences.workTime * 60;
  let breakTimeSeconds = roomPreferences.breakTime * 60;

  // Starts work timer, this will count down on the page.
  const startWorkTimer = () => {
    setWorkState(true);
    setBreakState(false);

    const countDown = async () => {
      console.log("workint");
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
        setTimerText(`Time for a break!`);
        await API.addTimeToUser(userObject.id, roomPreferences.workTime);
        setStarted(true);
        breakTimer();
      } else {
        setTimerText(`${minutes}:${seconds}`);
      }
    };

    const workInterval = setInterval(countDown, 1000);
  };

  // Break timer, same as above, just using breakTimeSeconds instead.
  const breakTimer = () => {
    setBreakState(true);
    const countDown = () => {
      console.log("breakint");
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
        setWorkState(false);
        setTimerText(`Time's Up!`);
      } else {
        setTimerText(`${minutes}:${seconds}`);
      }
    };
    const breakInterval = setInterval(countDown, 1000);
  };

  return (
    <div>
      {!breakState ? <h1>Work Time!</h1> : <h1>Break Time</h1>}
      <h2>{timerText}</h2>
      {workState === false ? (
        <button onClick={startWorkTimer}>Get to work!</button>
      ) : (
        <></>
      )}

      {breakState === true ? <Trivia userObject={userObject} /> : <></>}
    </div>
  );
}
