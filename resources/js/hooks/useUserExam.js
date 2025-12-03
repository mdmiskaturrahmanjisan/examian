import { useState } from "react";
import toast from "react-hot-toast";
import ExamService from "../services/ExamService";

export const useUserExam = () => {
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [remainingSeconds, setRemainingSeconds] = useState(null);

  const normalizeExam = (sess) => {
  return {
    user_exam_id: sess.id,  // <-- IMPORTANT FIX
    ...sess.exam,
    questions: sess.exam.questions ?? sess.questions ?? []
  };
};


  const start = async (examId) => {
    try {
      const res = await ExamService.start(examId);
      const sess = res.data.session ?? res.data;

      setExam(normalizeExam(sess));
      setAnswers(sess.answers ?? {});
      setRemainingSeconds(res.data.remaining_seconds ?? null);

      return sess.id;
    } catch (err) {
      toast.error("Failed to start exam");
      return null;
    }
  };

  const resume = async (userExamId) => {
    try {
      const res = await ExamService.resume(userExamId);
      const sess = res.data.session ?? res.data;

      setExam(normalizeExam(sess));
      setAnswers(sess.answers ?? {});
      setRemainingSeconds(res.data.remaining_seconds ?? null);

      return sess.id;
    } catch (err) {
      toast.error("Failed to resume exam");
      return null;
    }
  };

  const saveAnswer = async (questionId, optionId) => {
  if (!exam?.user_exam_id) {
    toast.error("Session expired. Please restart the exam.");
    return null;
  }

  try {
    const res = await ExamService.saveAnswer({
      user_exam_id: exam.user_exam_id,
      question_id: questionId,
      selected_option_ids: [optionId]
    });

    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    return res.data;

  } catch (err) {
    toast.error(err?.response?.data?.message ?? "Failed to save answer");
    return null;
  }
};



  const submit = async () => {
    try {
      const res = await ExamService.submit(exam.user_exam_id);
      toast.success("Exam submitted");
      return res.data;
    } catch (err) {
      toast.error("Failed to submit exam");
      return null;
    }
  };

  return { exam, answers, remainingSeconds, start, resume, saveAnswer, submit };
};