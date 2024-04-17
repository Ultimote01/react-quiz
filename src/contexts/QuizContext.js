import { createContext, useContext, useReducer, useEffect } from "react";


const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

let answerArray=[]

let ReceivedData;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  hasAnswered:null,
  currentAnswer:null,
  prevPage:false
};

let remainSecond=50;

function reducer(state, action) {
  switch (action.type) {
    
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
       
      const question = state.questions.at(state.index);

      if (answerArray.length<state.questions.length){
        
        if (answerArray.length < state.index+1)answerArray.push(action.payload)
        
      }else{
        answerArray=answerArray.map((item,index)=>{
          if (index === state.index){
            return item=action.payload;
          }else return item;
        })
      }
       
      //console.log(state.questions.length);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      currentAnswer:action.payload, prevPage:false};
    case "nextQuestion":
      
      return { ...state, index: state.index + 1, answer:state.index+1<answerArray.length?state.answer:null,
        hasAnswered:true,prevPage:false};

    case "finish":
       
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      answerArray=[];
      return { ...initialState, questions: state.questions, status: "ready" ,highscore:state.highscore};

    case "tick":
    
      return {
        ...state,
        /*secondsRemaining: state.secondsRemaining - 1,*/
        status: action.payload === 0 ? "finished" : state.status,
      };
    case "PrevQuestion":
      //console.log(answerArray[state.index-1],state.index);
      return{...state,index: state.index - 1,answer:answerArray[state.index-1],prevPage:true}

    default:
      throw new Error("Action unkonwn");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining,hasAnswered,
      currentAnswer,prevPage},
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  
function Level(index){
  
  if (Number(index) === 0){
    const data=ReceivedData.filter((items)=>items.points===10)
    dispatch({ type: "dataReceived", payload: data })
    

  }else if (Number(index) === 1){
    const data=ReceivedData.filter((items)=>items.points===20)
    dispatch({ type: "dataReceived", payload: data })
    
  } else if (Number(index) === 2){
    const data=ReceivedData.filter((items)=>items.points===30)
    dispatch({ type: "dataReceived", payload: data })
  }

  }
  

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) =>{
      ReceivedData=data;
      Level(0);
      
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (<>
    <QuizContext.Provider remainSecond={remainSecond}
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        hasAnswered,
        currentAnswer,
        prevPage,
        answerArray,
        remainSecond,
        Level,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
    </>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);


  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
