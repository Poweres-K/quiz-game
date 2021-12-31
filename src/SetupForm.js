import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleSubmit, handleChange, warning, setWarning } =
    useGlobalContext();

  React.useEffect(() => {
    if (warning.show) {
      let timer1 = setTimeout(
        () => setWarning({ ...warning, show: false }),
        1000
      );
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [warning.show, warning, setWarning]);
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form" onSubmit={handleSubmit}>
          <h2>Setup Quiz</h2>
          <div className="form-control">
            <label htmlFor="amount">number of questions</label>
            <input
              className="form-input"
              type="number"
              id="amount"
              name="amount"
              onChange={handleChange}
              value={quiz.totalQuestion}
              min={1}
              max={50}
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">category</label>
            <select name="category" id="category" className="form-input">
              <option value="sports">sports</option>
              <option value="history">history</option>
              <option value="politics">politics</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">select difficulty</label>
            <select name="difficulty" id="difficulty" className="form-input">
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            start
          </button>
        </form>
      </section>
      <div className={warning.show ? "footer footer-show" : "footer"}>
        <p style={{ color: "white" }}>{warning.msg}</p>
      </div>
    </main>
  );
};

export default SetupForm;
