import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Drawer from "../../components/ui/Drawer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import { Toaster } from "react-hot-toast";
import { Plus } from "lucide-react";
import { useExam } from "../../hooks/useExam";
import { useSubject } from "../../hooks/useSubject";
import { useTopic } from "../../hooks/useTopic";

export default function Exams() {
  const { exams, saveExam, removeExam } = useExam();
  const { subjects } = useSubject();
  const { topics } = useTopic();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset, watch, setValue, control } = useForm({
    defaultValues: {
      subject_ids: [],
      topic_ids: [],
    },
  });

  // Watch selected subjects
  const selectedSubjects = watch("subject_ids") || [];

  // Filter topics based on selected subjects
  const filteredTopics = topics.filter((t) =>
    selectedSubjects.includes(t.subject_id)
  );

  // Keep topic_ids valid when subjects change
  useEffect(() => {
    setValue("topic_ids", (prev) => {
      const prevArray = Array.isArray(prev) ? prev : [];
      return prevArray.filter((tid) =>
        filteredTopics.some((t) => t.id === tid)
      );
    });
  }, [filteredTopics, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      duration_minutes: Number(data.duration_minutes),
      marks_per_question: Number(data.marks_per_question),
      negative_marks_per_question: Number(data.negative_marks_per_question),
      total_questions: data.total_questions
        ? Number(data.total_questions)
        : undefined,
      pass_mark: data.pass_mark !== "" ? Number(data.pass_mark) : undefined,
    };

    const saved = await saveExam(payload, editing);
    if (saved) {
      reset();
      setEditing(null);
      setDrawerOpen(false);
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "duration_minutes", label: "Duration (min)" },
    { key: "marks_per_question", label: "Marks/Q" },
    { key: "negative_marks_per_question", label: "Neg Marks/Q" },
    { key: "total_questions", label: "Questions" },
    {
      key: "created_at",
      label: "Created",
      render: (row) =>
        row.created_at ? new Date(row.created_at).toLocaleString() : "-",
    },
  ];

  const handleEdit = (row) => {
    setEditing(row);
    reset({
      title: row.title,
      duration_minutes: row.duration_minutes,
      marks_per_question: row.marks_per_question,
      negative_marks_per_question: row.negative_marks_per_question,
      total_questions: row.total_questions,
      pass_mark: row.pass_mark ?? "",
      description: row.description ?? "",
      subject_ids: row.subjects?.map((s) => s.id) || [],
      topic_ids: row.topics?.map((t) => t.id) || [],
    });
    setDrawerOpen(true);
  };

  return (
    <div>
      <Toaster />

      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Exams</h1>
        <Button
          onClick={() => {
            reset();
            setEditing(null);
            setDrawerOpen(true);
          }}
        >
          <Plus className="inline mr-1" size={16} /> Add Exam
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={exams}
        onEdit={handleEdit}
        onDelete={removeExam}
      />

      {/* Form Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Exam">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Title" {...register("title", { required: true })} />
          <Input
            label="Duration (minutes)"
            type="number"
            {...register("duration_minutes", { required: true })}
          />
          <Input
            label="Marks per question"
            type="number"
            step="0.1"
            {...register("marks_per_question", { required: true })}
          />
          <Input
            label="Negative marks per question"
            type="number"
            step="0.1"
            {...register("negative_marks_per_question", { required: true })}
          />
          <Input
            label="Total questions"
            type="number"
            {...register("total_questions")}
          />
          <Input label="Pass mark" type="number" step="0.1" {...register("pass_mark")} />

          {/* Subjects */}
          <label className="block mt-3 font-semibold">Subjects</label>
          <Controller
            control={control}
            name="subject_ids"
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={subjects.map((s) => ({ value: s.id, label: s.title }))}
                value={subjects
                  .filter((s) => Array.isArray(field.value) && field.value.includes(s.id))
                  .map((s) => ({ value: s.id, label: s.title }))}
                onChange={(val) => field.onChange(val.map((v) => v.value))}
              />
            )}
          />

          {/* Topics */}
          <label className="block mt-3 font-semibold">Topics</label>
          <Controller
            control={control}
            name="topic_ids"
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={filteredTopics.map((t) => ({ value: t.id, label: t.title }))}
                value={filteredTopics
                  .filter((t) => Array.isArray(field.value) && field.value.includes(t.id))
                  .map((t) => ({ value: t.id, label: t.title }))}
                onChange={(val) => field.onChange(val.map((v) => v.value))}
              />
            )}
          />

          {/* Description */}
          <label className="block mt-3">Description</label>
          <textarea
            className="w-full border rounded p-2"
            {...register("description")}
          />

          <Button type="submit" className="mt-4 w-full">
            {editing ? "Update" : "Create"}
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
