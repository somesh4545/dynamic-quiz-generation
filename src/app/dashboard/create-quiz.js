"use client";
import React, { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import QuizDisplay from "./../../../components/QuizDisplay";
import axios from "axios";

const difficulty = [{ name: "Easy" }, { name: "Medium" }, { name: "Hard" }];

export default function CreateQuiz({ setSelectedOption }) {
  const [selected, setSelected] = useState(difficulty[0]);
  const [formDone, setFormDone] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [questions, setQuestions] = useState();

  const [name, setname] = useState("");
  const [Topic, setTopic] = useState("");
  const [quizID, setQuizID] = useState();

  const [noOfQuestions, setnoOfQuestions] = useState(0);
  const [_document, set_document] = React.useState(null)

  React.useEffect(() => {
    set_document(document)
  }, [])

  const getCookieValue = (cookieName) => {
    if(_document != undefined) {
      const cookieArray = _document.cookie.split("; ");
      for (const cookie of cookieArray) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
          return value;
        }
      }
    }
    return null;
  };

  const generateQuiz = () => {
    if (!Topic || !noOfQuestions) {
      alert("All fields are required");
      return;
    }
    setFormDone(true);
    setProcessing(true);
    const teacher_id = getCookieValue("teacher_id");
    let data = {
      name: name,
      topics: Topic,
      difficulty: selected.name,
      no_questions: noOfQuestions,
      teacher_id: teacher_id,
    };
    axios.post("/api/create-quiz", data).then((response) => {
      response = response.data;
      if (response.status == false) {
        alert(response.message);
        setProcessing(false);
        setFormDone(false);
      } else {
        let ques = response.data;
        setQuestions(ques.questions);
        setQuizID(ques.quiz_id);
        // consol
        setProcessing(false);
      }
    });
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
          <QuizDisplay
            data={questions}
            quiz_id={quizID}
            setSelectedOption={setSelectedOption}
          />
        )
      ) : (
        <div>
          <h1 className="text-2xl font-bold text-white">Create Quiz</h1>
          <p>Effortless Quiz Generation with AI Assistance</p>

          <div className="mt-16">
            <div className="flex flex-col my-4">
              <label>Quiz name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                name="name"
                className="p-2 mt-2 text-black rounded-lg"
                placeholder="Enter quiz name"
              />
            </div>
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
