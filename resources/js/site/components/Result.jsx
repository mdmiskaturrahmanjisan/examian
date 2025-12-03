import React from "react";

export default function Result({ exam, answers, score, examTotalMarks, pass }) {
  if (!exam || !exam.questions || exam.questions.length === 0)
    return <p>No questions found</p>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">{exam.title} - Results</h2>
      <div className="mb-6 p-4 border rounded bg-gray-100">
        <p>
          <strong>Score:</strong> {score} / {examTotalMarks}
        </p>
        <p>
          <strong>Result:</strong>{" "}
          <span className={pass ? "text-green-600" : "text-red-600"}>
            {pass ? "Passed" : "Failed"}
          </span>
        </p>
      </div>

      {exam.questions.map((q) => {
        const correctOptionIds = q.options
          .filter((opt) => opt.is_correct)
          .map((opt) => opt.id);

        const userSelectedId = answers[q.id];

        return (
          <div key={q.id} className="p-5 my-4 border rounded bg-white">
            <h3 className="font-semibold mb-2">{q.question_text}</h3>

            {q.options?.map((opt) => {
              const isCorrect = correctOptionIds.includes(opt.id);
              const isSelected = userSelectedId === opt.id;

              let bgColor = "";
              if (isCorrect) bgColor = "bg-green-200";
              else if (isSelected && !isCorrect) bgColor = "bg-red-200";

              return (
                <div
                  key={opt.id}
                  className={`flex items-center gap-2 my-2 p-2 rounded ${bgColor}`}
                >
                  <input
                    type="radio"
                    checked={isSelected}
                    readOnly
                  />
                  <span>{opt.option_text}</span>
                  {isCorrect && <span className="ml-2 text-green-700 font-bold">(Correct)</span>}
                  {isSelected && !isCorrect && <span className="ml-2 text-red-700 font-bold">(Your choice)</span>}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
