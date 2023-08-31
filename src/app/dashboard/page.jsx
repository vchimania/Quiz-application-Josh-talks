"use client";

import React, { useEffect, useState } from "react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // Time in seconds (10 minutes)
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    // Fetch quiz questions from the API
    fetch("https://opentdb.com/api.php?amount=15")
      .then((response) => response.json())
      .then((data) => {
        const fetchedQuestions = data.results.map((questionData) => {
          const choices = [
            ...questionData.incorrect_answers,
            questionData.correct_answer,
          ];
          return {
            question: questionData.question,
            choices: choices.sort(() => Math.random() - 0.5), // Shuffle choices
            correctAnswer: questionData.correct_answer,
          };
        });
        setQuestions(fetchedQuestions);
      })
      .catch((error) => console.error("Error fetching quiz questions:", error));
  }, []);

  const handleOptionSelect = (event) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = event.target.value;
    setSelectedAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setQuizSubmitted(false);
  };

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000); // Update time every second

      return () => clearTimeout(timer); // Cleanup the timer
    } else if (timerActive && timeLeft === 0) {
      handleAutoSubmit(); // Automatically submit the quiz
      setTimerActive(false);
    }
  }, [timeLeft, timerActive]);

  const handleAutoSubmit = () => {
    setQuizSubmitted(true);
  };

  return (
    <>
      <div className="text-right pt-6 mr-5">
        <span className="font-bold">Time Left:</span>{" "}
        <span className="text-red-600 text-xl font-bold">
          {" "}
          {Math.floor(timeLeft / 60)}:{timeLeft % 60}
        </span>
      </div>

      <div className="grid h-screen place-items-center">
        <div className="border border-gray-600 rounded-lg bg-white p-7">
          {questions.length > 0 && !quizSubmitted && (
            <div>
              <h2 className="text-lg font-semibold mb-4">
                {questions[currentQuestion].question}
              </h2>
              <form>
                {questions[currentQuestion].choices.map((option, index) => (
                  <label key={index} className="block mb-2">
                    <input
                      type="radio"
                      name={`question_${currentQuestion}`}
                      value={option}
                      checked={selectedAnswers[currentQuestion] === option}
                      onChange={handleOptionSelect}
                      className=""
                    />
                    {option}
                  </label>
                ))}
              </form>
              <div className="flex space-x-4 mb-4">
                {currentQuestion > 0 && (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    className="py-1 px-2 rounded bg-blue-950 text-white"
                  >
                    Previous
                  </button>
                )}
                {questions.map((_, index) => (
                  <button
                    key={index}
                    className={`py-1 px-2 rounded text-center ${
                      currentQuestion === index
                        ? "bg-blue-950 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    {index + 1}
                  </button>
                ))}
                {currentQuestion === questions.length - 1 && (
                  <button
                    onClick={handleSubmitQuiz}
                    className="py-1 px-2 rounded bg-red-700 text-white"
                  >
                    Submit
                  </button>
                )}
                {currentQuestion < questions.length - 1 && (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    className="py-1 px-2 rounded bg-blue-950 text-white"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}

          {quizSubmitted && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-center">
                Quiz Results
              </h2>
              {questions.map((question, index) => (
                <div key={index} className="mb-4">
                  <p className="font-semibold">{question.question}</p>
                  <p className="text-red-600 font-bold">
                    Your Answer: {selectedAnswers[index]}
                  </p>
                  <p className="text-green-600 font-bold">
                    Correct Answer: {question.correctAnswer}
                  </p>
                  <hr className="my-2" />
                </div>
              ))}
              <div className="text-center">
                <button
                  onClick={handleRestartQuiz}
                  className="bg-red-700 text-white py-2 px-4 rounded"
                >
                  Restart Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Quiz;
