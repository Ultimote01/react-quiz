import { useEffect, useState } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { dispatch, secondsRemaining} = useQuiz();
  const [remain,setRemain]=useState(secondsRemaining);


  const mins = Math.floor(remain / 60);
  const seconds = remain % 60;


  useEffect(
    function () {
      const id = setInterval(function () {
        //secondsRemaining-=1;
        //if (secondsRemaining===0){dispatch({ type: "tick" });}
        setRemain((cur)=>cur-1);
        if (remain ===0)
        dispatch({ type: "tick",payload:remain});
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch,secondsRemaining,setRemain,remain]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
