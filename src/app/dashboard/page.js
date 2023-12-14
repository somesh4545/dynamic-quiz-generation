"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import DashboardComponent from "./dashboard";
import CreateQuizComponent from "./create-quiz";
import PastQuizzesComponent from "./past-quiz";

export default function dashboard() {
  const [selectedOption, setSelectedOption] = useState("createQuiz");
  const router = useRouter();
  const handleLogout = () => {
    router.push("/");
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  return (
    <div className="min-h-screen min-w-screen bg-gray-900 flex flex-row">
      <div className="w-80 min-h-full bg-white flex p-8 flex-col ">
        <ul className="">
          <li
            className={`text-black mb-4 font-bold cursor-pointer ${
              selectedOption === "dashboard" && "text-blue-500"
            }`}
            onClick={() => handleOptionClick("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={`text-black mb-4 font-bold cursor-pointer ${
              selectedOption === "createQuiz" && "text-blue-500"
            }`}
            onClick={() => handleOptionClick("createQuiz")}
          >
            Create Quiz
          </li>
          <li
            className={`text-black mb-4 font-bold cursor-pointer ${
              selectedOption === "pastQuizzes" && "text-blue-500"
            }`}
            onClick={() => handleOptionClick("pastQuizzes")}
          >
            Past Quizzes
          </li>
        </ul>
        <div
          className="mt-auto text-black mb-4 font-bold border-2 p-2 px-4 cursor-pointer rounded-lg w-fit justify-center"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
      <div className="m-10 flex-grow">
        {selectedOption === "dashboard" && <DashboardComponent />}
        {selectedOption === "createQuiz" && (
          <CreateQuizComponent setSelectedOption={setSelectedOption} />
        )}
        {selectedOption === "pastQuizzes" && <PastQuizzesComponent />}
      </div>
    </div>
  );
}
