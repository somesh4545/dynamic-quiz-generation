"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CreateQuiz() {
  const [viewDetails, setViewDetails] = useState(null);
  const [quizDetails, setQuizDetails] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [processing, setProcessing] = useState(true);

  const getCookieValue = (cookieName) => {
    const cookieArray = document.cookie.split("; ");
    for (const cookie of cookieArray) {
      const [name, value] = cookie.split("=");
      if (name === cookieName) {
        return value;
      }
    }
    return null;
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  const fetchQuizzes = async () => {
    try {
      const teacher_id = getCookieValue("teacher_id");
      const response = await axios.get(`/api/quizzes?teacher_id=${teacher_id}`);

      const { data } = response.data;
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const fetchQuizDetails = async (quizId) => {
    try {
      const response = await axios.get(`/api/responses?quiz_id=${quizId}`);
      const { data } = response.data;
      setQuizDetails(data);
      setViewDetails(quizId);
      console.log(quizDetails);
      setProcessing(false);
    } catch (error) {
      console.error("Error fetching quiz details:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleViewDetails = (quizId) => {
    fetchQuizDetails(quizId);
  };

  const handleBack = () => {
    setViewDetails(null);
    setQuizDetails(null);
  };

  return (
    <>
      {viewDetails === null ? (
        <div className="min-w-full overflow-x-auto ">
          <h1 className="font-bold text-2xl">Past Quizzes</h1>
          <p className="mt-3 mb-5">Your Archive of Completed Quizzes</p>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Quiz Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Quiz Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Responses
                </th>

                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((quiz) => (
                <tr
                  key={quiz.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {quiz.id}
                  </th>
                  <td className="px-6 py-4">{quiz.name}</td>
                  <td className="px-6 py-4">{quiz.total_responses}</td>
                  <td className="px-6 py-4">{formatDate(quiz.date)}</td>
                  <td className="px-6 py-4">
                    <button
                      className="underline text-blue-600"
                      onClick={() => handleViewDetails(quiz.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : processing == false ? (
        <div>
          <button
            className="font-bold p-2 px-4 bg-slate-600 text-blue-500 rounded-lg w-fit"
            onClick={handleBack}
          >
            {"<"} Back
          </button>

          <h1 className="mt-5 font-extrabold text-3xl">
            {quizDetails.quiz.name}
          </h1>
          <p className="mt-2">Topics covered: {quizDetails.quiz.topics}</p>
          <p className="mt-2">Date: {formatDate(quizDetails.quiz.date)}</p>
          <table className="w-full mt-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sr. No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Student name
                </th>
                <th scope="col" className="px-6 py-3">
                  Marks scored
                </th>
              </tr>
            </thead>
            <tbody>
              {quizDetails.responses.map((response, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{response.student_name}</td>
                  <td className="px-6 py-4">{response.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}
