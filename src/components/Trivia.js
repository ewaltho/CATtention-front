import React, { useEffect, useState } from "react";
import API from "../utils/API";

export default function Trivia({ userObject }) {
  const [answersArr, setAnswersArr] = useState([]);
  const [correctAns, setCorrectAns] = useState("");
  const [question, setQuestion] = useState("");
  const [questionID, setQuestionID] = useState("");
  const [questionAnswered, setQuestionAnswered] = useState(false);
  let userScore;

  useEffect(() => {
    API.randomTriviaQuestion().then((res) => {
      let answers = res.data.answers;
      setQuestionID(res.data.id);
      setQuestion(res.data.question);
      setCorrectAns(res.data.correct_answer);
      setAnswersArr(answers.split(";"));
    });
  }, []);

  const checkAnswer = async (e) => {
    e.preventDefault();
    const returnedQuestion = await API.getTriviaByID(questionID);
    if (returnedQuestion.data.correct_answer === e.target.textContent) {
      const score = await API.addScoreToUser(userObject.id, 1);

      return (userScore = score.data.newScore);
    }
    setQuestionAnswered(true);
  };

  return (
    <div>
      <h2>A wild trivia question spawned!</h2>
      <h3>{question}</h3>
      {!questionAnswered ? (
        <ul>
          {answersArr.map((ans, index) => (
            <button key={index} onClick={checkAnswer}>
              {ans}
            </button>
          ))}
        </ul>
      ) : (
        <p>
          The correct answer is {correctAns}, and your score has been updated.
        </p>
      )}
    </div>
  );
}
