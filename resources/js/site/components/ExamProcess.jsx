
import React from "react";

export default function ExamProcess({ exam, answers, onAnswer, onSubmit }) {
  if (!exam || !exam.questions || exam.questions.length === 0)
    return <p>No questions found</p>;

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold">{exam.title}</h2>

      {exam.questions.map((q) => (
        <div key={q.id} className="p-5 my-4 border rounded bg-white">
          <h3 className="font-semibold">{q.question_text}</h3>

          {q.options?.map((opt) => (
            <label key={opt.id} className="flex items-center gap-2 my-2">
              <input
                type="radio"
                name={`q-${q.id}`}
                checked={answers[q.id] === opt.id}
                onChange={() => onAnswer(q.id, opt.id)}
              />
              {opt.option_text}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={onSubmit}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Submit Exam
      </button>
    </div>
  );
}


