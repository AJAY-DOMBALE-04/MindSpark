// // src/App.js
// import React, { useEffect, useState } from 'react';
// import { fetchQuizzes } from './api/quizApi';
// import './App.css';



// function App() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [isQuizCompleted, setIsQuizCompleted] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [hintVisible, setHintVisible] = useState(false);
//   const [timer, setTimer] = useState(10);
//   const [showExplanation, setShowExplanation] = useState(false); // New state
  



  


//   useEffect(() => {
//     const getQuizzes = async () => {
//       const data = await fetchQuizzes();
//       setQuizzes(data);
//     };
//     getQuizzes();
//   }, []);

//   useEffect(() => {
//     if (timer === 0) {
//       handleSkip();
//     } else {
//       const countdown = setTimeout(() => setTimer(timer - 1), 1000);
//       return () => clearTimeout(countdown);
//     }
//   }, [timer]);

//   // const handleAnswer = (option) => {
//   //   setSelectedOption(option);
//   //   const currentQuestion = quizzes[currentQuestionIndex];

//   //   if (option === currentQuestion.answer) {
//   //     setScore(score + 1);
//   //   }

//   //   if (currentQuestionIndex + 1 < quizzes.length) {
//   //     setTimeout(() => {
//   //       setCurrentQuestionIndex(currentQuestionIndex + 1);
//   //       setSelectedOption(null);
//   //       setHintVisible(false);
//   //       setTimer(10);
//   //     }, 1000);
//   //   } else {
//   //     setTimeout(() => setIsQuizCompleted(true), 1000);
//   //   }
//   // };

//   const handleAnswer = (option) => {
//     setSelectedOption(option); // Record the selected answer
//     const currentQuestion = quizzes[currentQuestionIndex];
  
//     if (option === currentQuestion.answer) {
//       setScore(score + 1); // Increase score if the answer is correct
//     }
  
//     setShowExplanation(true); // Show the explanation
  
//     // After 3 seconds, move to the next question
//     setTimeout(() => {
//       if (currentQuestionIndex + 1 < quizzes.length) {
//         setCurrentQuestionIndex(currentQuestionIndex + 1);
//         setSelectedOption(null);
//         setShowExplanation(false); // Hide the explanation for the next question
//         setHintVisible(false);
//         setTimer(10);
//       } else {
//         setIsQuizCompleted(true); // If it's the last question, end the quiz
//       }
//     }, 3000); // Wait 3 seconds
//   };
  

//   const handleSkip = () => {
//     setSelectedOption(null);
//     if (currentQuestionIndex + 1 < quizzes.length) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       setTimer(10);
//       setHintVisible(false);
//     } else {
//       setIsQuizCompleted(true);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//       setSelectedOption(null);
//       setHintVisible(false);
//       setTimer(10);
//     }
//   };


  

//   const showHint = () => {
//     setHintVisible(true);
//   };

//   if (!quizzes.length) return <div>Loading...</div>;

//   const currentQuestion = quizzes[currentQuestionIndex];

//   return (
//     <div className="quiz-app">
//       <h1>QuizMaster</h1>
//       {isQuizCompleted ? (
//         <div>
//           <h2>Your Score: {score} / {quizzes.length}</h2>
//           <p>Quiz Completed! Thanks for playing.</p>
//           <button className="retake-button" onClick={() => window.location.reload()}>Retake Quiz</button>
//         </div>
//       ) : (
//         <div>
//           <h2>Question {currentQuestionIndex + 1}</h2>
//           <p>{currentQuestion.question}</p>
//           <p className="timer">Time Remaining: {timer} seconds</p>
//           <ul>
//             {currentQuestion.options.map((option, index) => (
//               <li key={index}>
//                 <button
//                   className={`option-button ${
//                     selectedOption
//                       ? option === currentQuestion.answer
//                         ? 'correct'
//                         : selectedOption === option
//                         ? 'incorrect'
//                         : ''
//                       : ''
//                   }`}
//                   onClick={() => handleAnswer(option)}
//                   disabled={selectedOption !== null}
//                 >
//                   {String.fromCharCode(65 + index)}) {option}
//                 </button>
//               </li>
//             ))}
//           </ul>

//           {showExplanation && (
//   <div className="explanation">
//     Explanation: {currentQuestion.explanation}
//   </div>
// )}

//           <button className="hint-button" onClick={showHint}>Hint</button>
//           {hintVisible && (
//             <div className="hint">
//               Hint: The answer starts with '{currentQuestion.answer.charAt(0)}'
//             </div>
//           )}
          
//           <div className="navigation-buttons">

//             <button className="previous-button" onClick={handlePrevious}>Previous</button>
           
//             <button className="skip-button" onClick={handleSkip}>Skip</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from 'react';
import { fetchQuizzes } from './api/quizApi';
import './App.css';

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [timer, setTimer] = useState(10);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false); // State to toggle calculator
  const [input, setInput] = useState(''); // Calculator input state

  useEffect(() => {
    const getQuizzes = async () => {
      const data = await fetchQuizzes();
      setQuizzes(data);
    };
    getQuizzes();
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleSkip();
    } else {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    const currentQuestion = quizzes[currentQuestionIndex];

    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }

    setShowExplanation(true);

    setTimeout(() => {
      if (currentQuestionIndex + 1 < quizzes.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setShowExplanation(false);
        setHintVisible(false);
        setTimer(10);
      } else {
        setIsQuizCompleted(true);
      }
    }, 3000);
  };

  const handleSkip = () => {
    setSelectedOption(null);
    if (currentQuestionIndex + 1 < quizzes.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(10);
      setHintVisible(false);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null);
      setHintVisible(false);
      setTimer(10);
    }
  };

  const showHint = () => {
    setHintVisible(true);
  };

  // Calculator functions
  const handleCalculatorInput = (value) => {
    if (value === 'C') {
      setInput('');
    } else if (value === '=') {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput('Error');
      }
    } else {
      setInput(input + value);
    }
  };

  if (!quizzes.length) return <div>Loading...</div>;

  const currentQuestion = quizzes[currentQuestionIndex];

  return (
    <div className="quiz-app">
      <h1>MindSpark
      </h1>
      {isQuizCompleted ? (
        <div>
          <h2>Your Score: {score} / {quizzes.length}</h2>
          <p>Quiz Completed! Thanks for playing.</p>
          <button className="retake-button" onClick={() => window.location.reload()}>Retake Quiz</button>
        </div>
      ) : (
        <div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{currentQuestion.question}</p>
          <p className="timer">Time Remaining: {timer} seconds</p>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>
                <button
                  className={`option-button ${
                    selectedOption
                      ? option === currentQuestion.answer
                        ? 'correct'
                        : selectedOption === option
                        ? 'incorrect'
                        : ''
                      : ''
                  }`}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedOption !== null}
                >
                  {String.fromCharCode(65 + index)}) {option}
                </button>
              </li>
            ))}
          </ul>

          {showExplanation && (
            <div className="explanation">
              Explanation: {currentQuestion.explanation}
            </div>
          )}

          <button className="hint-button" onClick={showHint}>Hint</button>
          {hintVisible && (
            <div className="hint">
              Hint: The answer starts with '{currentQuestion.answer.charAt(0)}'
            </div>
          )}

          <div className="navigation-buttons">
            <button className="previous-button" onClick={handlePrevious}>Previous</button>
            <button className="skip-button" onClick={handleSkip}>Skip</button>
          </div>

          {/* Calculator Toggle Button */}
          <button onClick={() => setShowCalculator(!showCalculator)}>
            {showCalculator ? 'Hide Calculator' : 'Show Calculator'}
          </button>

          {/* Calculator Component */}
          {showCalculator && (
            <div className="calculator">
              <div className="display">{input}</div>
              <div className="buttons">
                {['7', '8', '9', '/'].map((btn) => (
                  <button key={btn} onClick={() => handleCalculatorInput(btn)}>{btn}</button>
                ))}
                {['4', '5', '6', '*'].map((btn) => (
                  <button key={btn} onClick={() => handleCalculatorInput(btn)}>{btn}</button>
                ))}
                {['1', '2', '3', '-'].map((btn) => (
                  <button key={btn} onClick={() => handleCalculatorInput(btn)}>{btn}</button>
                ))}
                {['0', '.', '=', '+'].map((btn) => (
                  <button key={btn} onClick={() => handleCalculatorInput(btn)}>{btn}</button>
                ))}
                <button onClick={() => handleCalculatorInput('C')}>C</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
