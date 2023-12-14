"use client";
import React, { useState } from "react";

export default function createQuiz() {
  const [viewDetails, setviewDetails] = useState(1);

  return (
    <>
      {viewDetails == null ? (
        <div class="min-w-full overflow-x-auto ">
          <h1 class="font-bold text-2xl">Past Quizzes</h1>
          <p class="mt-3 mb-5">Your Archive of Completed Quizzes</p>
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Quiz Id
                </th>
                <th scope="col" class="px-6 py-3">
                  Quiz Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Responses
                </th>
                <th scope="col" class="px-6 py-3">
                  Highest score
                </th>
                <th scope="col" class="px-6 py-3">
                  Average score
                </th>
                <th scope="col" class="px-6 py-3">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  123
                </th>
                <td class="px-6 py-4">XYZ</td>
                <td class="px-6 py-4">12</td>
                <td class="px-6 py-4">9</td>
                <td class="px-6 py-4">8.1</td>
                <td class="px-6 py-4">
                  <button
                    class="underline text-blue-600"
                    onClick={() => setviewDetails(1)}
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <button
            class="font-bold p-2 px-4 bg-slate-600 text-blue-500 rounded-lg w-fit"
            onClick={() => setviewDetails(null)}
          >
            {"<"} Back
          </button>

          <h1 class="mt-5 font-extrabold text-3xl">Quiz name </h1>
          <p class="mt-2">
            Topics covered: <span class="text-gray-200">DSA, DP</span>
          </p>
          <p class="mt-2">Average marks: 20</p>
          <p class="mt-2">Total marks: 25</p>
          <table class="w-full mt-5 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Sr. No.
                </th>
                <th scope="col" class="px-6 py-3">
                  Student name
                </th>
                <th scope="col" class="px-6 py-3">
                  Marks scored
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4">1</td>
                <td class="px-6 py-4">Somesh</td>
                <td class="px-6 py-4">20</td>
              </tr>
            
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
