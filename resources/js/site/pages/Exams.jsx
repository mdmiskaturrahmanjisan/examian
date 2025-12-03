import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useExam } from "../../hooks/useExam";

export default function Exams() {
  const { exams, fetchExams, loading } = useExam();

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Exams</h1>

      {loading && <p>Loading exams...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div key={exam.id} className="p-5 bg-white shadow rounded border">
            <h2 className="text-xl font-bold">{exam.title}</h2>
            <p className="mt-2">Duration: {exam.duration} mins</p>
            <p>Total Marks: {exam.total_marks}</p>

            <Link
              to={`/exam/${exam.id}`}
              className="block mt-4 bg-blue-600 text-white py-2 rounded text-center"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
