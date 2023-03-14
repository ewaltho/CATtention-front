import React, { useEffect, useState } from  'react';
import API from '../utils/API';

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
      await API.addScoreToUser(userObject.id, 1);
    }
    setQuestionAnswered(true);
  };

  return (
    <div className='triviaBox'>
      <h2 className="triviaTitle">A wild trivia question spawned!</h2>
      <h3 className="questionTitle">{question}</h3>
      {!questionAnswered ? (
        <ul className="questionCard">
          {answersArr.map((ans, index) => (
            <button key={index} onClick={checkAnswer}>
              {ans}
            </button>
          ))}
        </ul>
      ) : (
        <p
          style={{
            fontSize: "20px",
          }}
        >
          The correct answer is {correctAns}. Your score has been updated.
        </p>
      )}
    </div>
  );
}
