import { useQuiz } from "../contexts/QuizContext";

function Options({ question }) {
  const { dispatch, answer ,prevPage,answerArray,index} = useQuiz();

  const hasAnswered = answer !== null;
  const selectedOption=answerArray[index];
  //console.log(index);


  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered && !prevPage
              ? index === question.correctOption 
                ? "correct"
                : index===selectedOption?'':"wrong"
              : ""
          } ${hasAnswered && prevPage
            ? index === question.correctOption 
                ? "correct"
                : index===selectedOption?'':"wrong"
              : ""}`}
            
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
