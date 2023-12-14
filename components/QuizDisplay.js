import copy from "clipboard-copy";

export default function QuizDisplay({ data, setSelectedOption }) {
  const generateAndShare = async () => {
    await copy("http://localhost:3000/take-quiz/14");
    alert("Link is copied. You can share it now :) ");
    setSelectedOption("pastQuizzes");
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">Generated Quiz</h1>
      <p className="text-gray-100">
        Edit if needed. Save and share with your students
      </p>

      <div className="mt-16">
        {data.map((question, idx) => (
          <div key={idx} className="mb-5">
            <h1 className="text-white  text-xl">
              Q.{idx + 1} {question.question}
            </h1>
            {question.options.map((value, ydx) => (
              <p
                className={`${
                  value === question.right ? "text-blue-500" : "text-white"
                }`}
              >
                {ydx + 1}. {value}
              </p>
            ))}
          </div>
        ))}

        <button
          onClick={generateAndShare}
          className="mt-10 px-6 py-2 bg-blue-500 rounded-lg"
        >
          Generate and Share
        </button>
      </div>
    </div>
  );
}
