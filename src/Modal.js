import React, { useMemo } from "react";
import { useGlobalContext } from "./context";

const randomInsert = (array, element) => {
  const rand = Math.floor(Math.random() * 4);
  array.splice(rand, 0, element);
  return array;
};

const Modal = () => {
  const { quiz, handleSubmitAnswer, showModal, handleReset } =
    useGlobalContext();
  const {
    correctCount,
    questionIndex,
    allQuestion,
    wrongCount,
    totalQuestion,
  } = quiz;
  const { question, correct_answer, incorrect_answers } =
    allQuestion[questionIndex];

  const choices = useMemo(() => {
    return randomInsert(incorrect_answers, correct_answer);
  }, [incorrect_answers, correct_answer]);

  return (
    <main>
      <div className={showModal ? "modal-container isOpen" : "modal-container"}>
        <div className="modal-content">
          <h2>congrats!</h2>
          <p>
            You answered {Math.round((correctCount / totalQuestion) * 100)}% of
            questions correctly
          </p>
          <button className="close-btn" onClick={handleReset}>
            play again
          </button>
        </div>
      </div>
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correctCount}/{wrongCount}
        </p>
        <article className="container">
          <h2>{question}</h2>
          <div className="btn-container">
            {choices.map((choice, index) => {
              return (
                <button
                  className="answer-btn"
                  key={index}
                  onClick={() => {
                    handleSubmitAnswer(choice);
                  }}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        </article>
        <button
          className="next-question"
          onClick={() => {
            handleSubmitAnswer();
          }}
        >
          next question
        </button>
      </section>
    </main>
  );
};

export default Modal;
