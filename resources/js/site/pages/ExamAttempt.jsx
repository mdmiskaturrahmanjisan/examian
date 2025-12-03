import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserExam } from "../../hooks/useUserExam";
import ExamProcess from "../components/ExamProcess";

export default function ExamAttempt() {
  const { userExamId } = useParams();
  const navigate = useNavigate();
  const { exam, answers, resume, saveAnswer, submit } = useUserExam();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExam();
  }, []);

  const loadExam = async () => {
    if (!userExamId) return;
    await resume(userExamId);
    setLoading(false);
  };

  const handleSubmit = async () => {
    const resultData = await submit();
    if (resultData) {
      navigate(`/exam-result/${exam.user_exam_id}`, { state: resultData });
    }
  };

  if (loading || !exam) return <p>Loading exam...</p>;

  return (
    <ExamProcess
      exam={exam}
      answers={answers}
      onAnswer={saveAnswer}
      onSubmit={handleSubmit}
    />
  );
}



