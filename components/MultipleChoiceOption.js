export default function MultipleChoiceOption({ idx, question, update }) {
  const handleOptionChange = (selectedOption) => {
    // Update the selected field in the questionArr array
    update((prevQuestionsArr) => {
      const updatedQuestionsArr = [...prevQuestionsArr];
      updatedQuestionsArr[idx].selected = selectedOption;
      return updatedQuestionsArr;
    });
  };
  return (
    <div className="mb-5">
      <h1 className="text-black font-medium text-xl">
        {idx + 1}. {question.question}
      </h1>
      <div className="flex flex-col">
        <form>
          {question.options.map((value, ydx) => (
            <label className="text-black flex flex-row">
              <input
                value={`${value}`}
                onChange={() => {
                  handleOptionChange(`${value}`);
                }}
                name={`question-${ydx}-${question.id}`}
                type="radio"
                checked={String(question.selected) === `${value}`}
                name="multipleChoice"
              />
              <p className="ml-2">{value}</p>
            </label>
          ))}
        </form>
      </div>
    </div>
  );
}
