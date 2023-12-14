"use client";
import React, { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const difficulty = [{ name: "Easy" }, { name: "Medium" }, { name: "Hard" }];

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
  },
];

export default function createQuiz() {
  const [selected, setSelected] = useState(difficulty[0]);
  const [formDone, setFormDone] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [Topic, setTopic] = useState("");
  const [noOfQuestions, setnoOfQuestions] = useState(0);

  const generateQuiz = () => {
    if (!Topic || !noOfQuestions) {
      alert("All fields are required");
      return;
    }

    setFormDone(true);
    setProcessing(true);
  };

  return (
    <>
      {formDone == true ? (
        processing == true ? (
          <div className=" flex flex-col justify-center items-center min-h-full flex-grow">
            <img
              src="https://i.gifer.com/origin/8c/8cd3f1898255c045143e1da97fbabf10_w200.gif"
              className="drop-shadow-image"
            />
            <h1 className="text-white font-bold text-2xl -mt-10">
              Generating Quiz. Please wait
            </h1>
          </div>
        ) : (
          <QuizDisplay data={questions} />
        )
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-white">Create Quiz</h1>
          <p>Effortless Quiz Generation with AI Assistance</p>

          <div className="mt-16">
            <div className="flex flex-col my-4">
              <label>Topic names</label>
              <input
                type="text"
                value={Topic}
                onChange={(e) => setTopic(e.target.value)}
                name="topic"
                className="p-2 mt-2 text-black rounded-lg"
                placeholder="Enter topic names comma seperated"
              />
            </div>
            <div className="flex flex-col my-4">
              <label>Difficulty</label>
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate text-black">
                      {selected.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {difficulty.map((diff, Idx) => (
                        <Listbox.Option
                          key={Idx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={diff}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {diff.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className="flex flex-col my-4">
              <label>Total question</label>
              <input
                type="number"
                value={noOfQuestions}
                onChange={(e) => {
                  setnoOfQuestions(e.target.value);
                }}
                name="topic"
                className="p-2 mt-2 text-black rounded-lg"
                placeholder="10"
              />
            </div>
            <button
              type="button"
              className="mt-4 p-4 bg-blue-500 rounded-lg px-8"
              onClick={generateQuiz}
            >
              Generate
            </button>
          </div>
        </div>
      )}
    </>
  );
}
