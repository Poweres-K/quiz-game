import axios from "axios";
import React, { useState, useContext } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isGameEnd, setGameEnd] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [warning, setWarning] = useState({
    show: false,
    msg: "Please lower number of questions",
  });
  const [quiz, setQuiz] = useState({
    correctCount: 0,
    wrongCount: 0,
    totalQuestion: 10,
    questionIndex: 0,
    allQuestion: [],
  });

  const handleReset = () => {
    setQuiz({
      ...quiz,
      wrongCount: 0,
      correctCount: 0,
      questionIndex: 0,
      totalQuestion: 10,
    });
    setGameEnd(true);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cat = table[e.target[1].value];
    const dif = e.target[2].value;

    fetchQuestion(
      `${API_ENDPOINT}amount=${quiz.totalQuestion}&category=${cat}&difficulty=${dif}&type=multiple`
    );
  };

  const fetchQuestion = async (url) => {
    setLoading(true);
    try {
      const respons = await axios(url);
      const question = respons.data.results;

      if (respons.data.response_code === 1) {
        setWarning({ ...warning, show: true });
        setLoading(false);
        return;
      }

      setQuiz({
        ...quiz,
        allQuestion: question,
        totalQuestion: question.length,
      });
      setGameEnd(false);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setQuiz({ ...quiz, totalQuestion: e.target.value });
  };

  const handleSubmitAnswer = (answer) => {
    const {
      allQuestion,
      questionIndex,
      correctCount,
      wrongCount,
      totalQuestion,
    } = quiz;
    let newCorrect = correctCount;
    let newWrong = wrongCount;
    let quizIndex = questionIndex;

    if (answer && answer === allQuestion[questionIndex].correct_answer) {
      newCorrect = correctCount + 1;
    } else {
      newWrong = wrongCount + 1;
    }
    if (quizIndex < totalQuestion - 1) {
      setQuiz({
        ...quiz,
        questionIndex: quizIndex + 1,
        correctCount: newCorrect,
        wrongCount: newWrong,
      });
    } else {
      setQuiz({
        ...quiz,
        correctCount: newCorrect,
        wrongCount: newWrong,
      });
      setShowModal(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isGameEnd,
        isLoading,
        quiz,
        showModal,
        warning,
        setWarning,
        handleReset,
        handleSubmit,
        handleChange,
        handleSubmitAnswer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
