"use client";
import React, { useState } from "react";
import MultipleChoiceOption from "./../../../../components/MultipleChoiceOption";

const questions = [
  {
    id: "12",
    question: "Please select right option",
    options: [
      "This is the right option",
      "Second one is right",
      "Third",
      "Fourth",
    ],
    right: "Fourth",
    selected: null,
  },
  {
    id: "13",
    question: "Please select right option",
    options: [
      "This is the right option",
      "Second one is right",
      "Third",
      "Fourth",
    ],
    right: "Fourth",
    selected: null,
  },
  {
    id: "14",
    question: "Please select right option",
    options: [
      "This is the right option",
      "Second one is right",
      "Third",
      "Fourth",
    ],
    right: "Third",
    selected: null,
  },
];

export default function takeQuiz({ params }) {
  const [questionsArr, setquestionsArr] = useState(questions);

  const processQuizResult = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to submit the quiz?"
    );

    if (isConfirmed) {
      let totalScore = 0;
      questionsArr.map((question) => {
        console.log(question.right, question.selected);
        if (question.right == question.selected) totalScore += 1;
      });
      alert(totalScore);
      document.cookie = "quizSubmitted=" + params.slug;
      document.cookie = "quizScore=" + totalScore;
    }
  };

  const getCookieValue = (cookieName) => {
    const cookieArray = document.cookie.split("; ");
    for (const cookie of cookieArray) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) {
        return value;
      }
    }
    return null; // Return null if the cookie is not found
  };

  if (getCookieValue("quizSubmitted") == params.slug) {
    return (
      <div class="bg-gray-900 p-24 py-16 min-w-full min-h-screen flex justify-center items-center">
        <div class="bg-white rounded-lg p-24 h-1/3 w-2/3 flex  flex-col justify-center items-center ">
          <h1 className="font-extrabold text-2xl text-black">Test Completed</h1>
          <h1 className="font-extrabold text-2xl text-black">
            Your score: {getCookieValue("quizScore")}
          </h1>
        </div>{" "}
      </div>
    );
  } else {
    return (
      <div class="bg-gray-900 p-24 py-16 min-w-full min-h-screen flex">
        <div class="bg-gray-300 rounded-lg w-full p-8  flex-grow">
          <div class="mb-10">
            <h1 class="font-extrabold text-3xl text-black">Quiz name</h1>
            <p class="text-black mb-4">Topics names: sfls, fsljf</p>
            <p class="text-black">Total questions: 10</p>
          </div>

          {questionsArr.map((question, idx) => (
            <MultipleChoiceOption
              idx={idx}
              question={question}
              update={setquestionsArr}
            />
          ))}

          <button
            className="bg-blue-600 py-2 px-4 rounded-lg my-4"
            onClick={processQuizResult}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
