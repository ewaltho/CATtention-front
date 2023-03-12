import React, { useState, useEffect } from 'react';
import Trivia from './Trivia';
import API from '../utils/API';

export default function Timer({
  roomPreferences,
  userObject,
  socket,
  roomData,
}) {
  const [timerText, setTimerText] = useState("");
  const [started, setStarted] = useState(false);
  const [workState, setWorkState] = useState(true);
  // Work time state... Cannot use room prefs for connected users.
  const [minutesWorked, setMinutesWorked] = useState("");
  const [breakState, setBreakState] = useState(false);

  // Will trigger api to add time to user only if it is from work time but not from break time :)
  useEffect(() => {
    if (timerText === "Time's up!" && workState === true) {
      console.log("first one");
      API.addTimeToUser(userObject.id, minutesWorked)
        .then((res) => {
          setWorkState(false);
          // setBreakState(true);
        })
        .catch((err) => console.log(err));
    } else if (timerText === "Time's up!" && workState === false) {
      setWorkState(true);
      setBreakState(false);
    }
    // eslint-disable-next-line
  }, [timerText]);
  // Starts work timer, this will count down on the page.
  const startWorkTimer = () => {
    if (timerText !== "Time's up!" && started === true) {
      return;
    }
    setBreakState(false);
    if (started === false) {
      setStarted(true);
    }
    console.log(roomData);
    setWorkState(true);
    socket.emit("timer", {
      roomCode: roomData.code,
      time: roomPreferences.workTime,
    });
  };
  // socket listens for timer text to be sent back from server and will add minutes worked from server so connected users get credit
  socket.on("timer", ({ text, minutesWorked }) => {
    if (workState) {
      setMinutesWorked(minutesWorked);
    } else if (!workState) {
      setMinutesWorked(0);
    }
    setTimerText(text);
  });

  const startBreakTimer = () => {
    if (timerText !== "Time's up!") {
      return;
    }
    !breakState && setBreakState(true);
    socket.emit("timer", {
      roomCode: roomData.code,
      time: roomPreferences.breakTime,
    });
  };

  return (
    <div className="timerCard">
      {workState ? <h2>Work Time!</h2> : <h2>Break Time</h2>}
      <h1 className="counter">{timerText}</h1>
      {workState === true ? (
        <button onClick={startWorkTimer}>Get to work!/Join Timer</button>
      ) : (
        <button onClick={startBreakTimer}>Start Break</button>
      )}
      {/* Trivia will only show during the timer while it is a break time */}
      {workState === false && started === true && timerText !== "Time's up!" ? (
        <Trivia userObject={userObject} />
      ) : (
        <></>
      )}
    </div>
  );
}
