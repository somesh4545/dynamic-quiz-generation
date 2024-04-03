"use client";
import React, { useState, useEffect } from "react";
import MultipleChoiceOption from "./../../../../components/MultipleChoiceOption";
import axios from "axios";
import { useRouter } from "next/navigation";

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

export default function TakeQuiz({ params }) {
  const router = useRouter();

  const [processing, setprocessing] = useState(true);
  const [questionsArr, setquestionsArr] = useState();
  const [quiz, setquiz] = useState();
  const [name, setname] = useState();

  useEffect(() => {
    fetchQuiz(params.slug);
  }, []);

  const fetchQuiz = async (slug) => {
    const response = await axios.get("/api/take-quiz?quiz_id=" + slug);
    const data = response.data.data;
    console.log(data);
    setquiz(data.quiz);

    setquestionsArr(data.questions);
    setprocessing(false);
  };

  const processQuizResult = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to submit the quiz?"
    );

    if (isConfirmed) {
      let totalScore = 0;
      questionsArr.map((question) => {
        console.log(question.right, question.selected);
        if (question.right_answer == question.selected) totalScore += 1;
      });

      await axios.post("/api/take-quiz", {
        quiz_id: params.slug,
        student_name: name,
        score: totalScore,
      });

      document.cookie = "quizSubmitted=" + params.slug;
      document.cookie = "quizScore=" + totalScore;
      router.refresh();
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
  let quizSubmitted = getCookieValue("quizSubmitted");
  if (quizSubmitted == params.slug) {
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
      <>
        {processing == true ? (
          <h1>Fetcchi</h1>
        ) : (
          <div class="bg-gray-900 p-24 py-16 min-w-full min-h-screen flex">
            <div class="bg-gray-300 rounded-lg w-full p-8  flex-grow">
              <div class="mb-10">
                <h1 class="font-extrabold text-3xl text-black">{quiz.name}</h1>
                <p class="text-black mb-4">Topics names: {quiz.topics}</p>
                <p class="text-black">Total questions: {questionsArr.length}</p>
              </div>

              <div className="flex flex-col my-4 mb-8">
                <label className="text-black text-lg">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  name="name"
                  className="p-2 mt-2 text-black bg-transparent border-b-2 border-black w-48  focus:outline-none p-0"
                />
              </div>

              {questionsArr.map((question, idx) => (
                <MultipleChoiceOption
                  idx={idx}
                  key={idx}
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
        )}
      </>
    );
  }
}
