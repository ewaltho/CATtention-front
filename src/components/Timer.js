import React, { useState, useEffect } from "react";
import Trivia from "./Trivia";
import API from "../utils/API";

export default function Timer({
  roomPreferences,
  userObject,
  socket,
  roomData,
}) {
  const [timerText, setTimerText] = useState("");
  // ! started will be used later on
  const [started, setStarted] = useState(false);
  const [workState, setWorkState] = useState(false);
  // Work time state... Cannot use room prefs for connected users.
  const [minutesWorked, setMinutesWorked] = useState("");
  const [breakState, setBreakState] = useState(false);

  socket.on("ye", (data) => console.log(data));
  // Grab our work and break seconds from roomprefs on previous page
  let workTimeSeconds = roomPreferences.workTime * 60;
  let breakTimeSeconds = roomPreferences.breakTime * 60;

  useEffect(() => {
    if (timerText === "Time's up!" && workState === true) {
      console.log("first one");
      API.addTimeToUser(userObject.id, minutesWorked)
        .then((res) => {
          console.log(res);
          setWorkState(false);
          setBreakState(true);
        })
        .catch((err) => console.log(err));
    } else if (timerText === "Time's up!" && workState === false) {
      setWorkState(true);
    }
  }, [timerText]);
  // Starts work timer, this will count down on the page.
  const startWorkTimer = () => {
    if (started === false) {
      setStarted(true);
    }
    console.log(roomData);
    setWorkState(true);
    socket.emit("timer", {
      roomCode: roomData.code,
      time: roomPreferences.workTime,
    });

    socket.on("timer", ({ text, minutesWorked }) => {
      setMinutesWorked(minutesWorked);
      setTimerText(text);
    });
  };

  return (
    <div className="timerCard">
      {workState ? <h2>Work Time!</h2> : <h2>Break Time</h2>}
      <h1 className="counter">{timerText}</h1>
      {workState === false ? (
        <button onClick={startWorkTimer}>Get to work!/Join Timer</button>
      ) : (
        <></>
      )}

      {workState === false && started === true ? (
        <Trivia userObject={userObject} />
      ) : (
        <></>
      )}
    </div>
  );
}
