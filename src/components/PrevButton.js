import { useQuiz } from "../contexts/QuizContext";


export default function Prevbutton(){
    const { dispatch, index,currentAnswer,hasAnswered} = useQuiz();

    if (hasAnswered && index >0){
         
return(
    <button style={{float:'left'}}
        className="btn btn-ui" onClick={()=>dispatch({type:'PrevQuestion',payload:currentAnswer})}>
        Prev
      </button>
)};
};