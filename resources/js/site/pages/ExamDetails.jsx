import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ExamService from "../../services/ExamService";
import { useUserExam } from "../../hooks/useUserExam";

export default function ExamDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { start } = useUserExam();
  const [exam, setExam] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await ExamService.get(id);
    setExam(res.data);
  };

const handleStart = async () => {
  const userExamId = await start(id);
  if (!userExamId) return; 
  navigate(`/exams/attempt/${userExamId}`);
};
  if (!exam) return "Loading...";

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">{exam.title}</h1>

      <div className="mt-4 p-5 bg-white shadow rounded">
        <p>Duration: {exam.duration} mins</p>
        <p>Total Marks: {exam.total_marks}</p>

        <button
          onClick={handleStart}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
        >
          Start Exam
        </button>
      </div>
    </div>
  );
}
