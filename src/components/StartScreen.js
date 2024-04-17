import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { numQuestions, Level,dispatch } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <select style={{marginBottom:'10px',fontFamily:'monospace'}} onChange={(e)=>Level(e.target.value)}>
        <option value={0}>Easy</option>
        <option value={1}>Medium</option>
        <option value={2}>Difficult</option>
      </select>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
