import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Result from "../components/Result";

export default function ExamResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state;

  if (!resultData) {
    return <p>No result data found.</p>;
  }

  const { session, score, exam_total_marks, pass } = resultData;
  const normalizedExam = {
    ...session.exam,
    questions: session.answers.map(ans => ans.question)
  };
  const answers = {};
  session.answers.forEach((ans) => {
    answers[ans.question.id] = ans.selected_option_ids[0]; 
  });

  React.useEffect(() => {
    toast.success("Exam submitted successfully!");
  }, []);

  const handleBack = () => {
    navigate("/exams");
  };

  return (
    <div className="container mx-auto py-10">
      <Result
        exam={normalizedExam}
        answers={answers}
        score={score}
        examTotalMarks={exam_total_marks}
        pass={pass}
      />

      <button
        onClick={handleBack}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Back to Exams
      </button>
    </div>
  );
}
