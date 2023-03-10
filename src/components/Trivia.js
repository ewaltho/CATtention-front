import React, { useEffect, useState } from "react";
import API from "../utils/API";

export default function Trivia({ userObject }) {
  const [answersArr, setAnswersArr] = useState([]);
  const [correctAns, setCorrectAns] = useState("");
  const [question, setQuestion] = useState("");

  useEffect(() => {
    API.randomTriviaQuestion().then((res) => {
      let answers = res.data.answers;
      setQuestion(res.data.question);
      setCorrectAns(res.data.correct_answer);
      setAnswersArr(answers.split(";"));
    });
  }, []);
  return (
    <div>
      <h2>A wild trivia question spawned!</h2>
      <h3>{question}</h3>
      <ul>
        {answersArr.map((ans, index) => (
          <button key={index}>{ans}</button>
        ))}
      </ul>
    </div>
  );
}
