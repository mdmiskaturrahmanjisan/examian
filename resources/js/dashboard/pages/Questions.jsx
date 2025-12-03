// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import Drawer from "../../components/ui/Drawer";
// import Input from "../../components/ui/Input";
// import Button from "../../components/ui/Button";
// import Table from "../../components/ui/Table";
// import { Toaster } from "react-hot-toast";
// import { Plus } from "lucide-react";
// import { useQuestion } from "../../hooks/useQuestion";

// export default function Questions() {
//   const { questions, saveQuestion, removeQuestion } = useQuestion();
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const { register, handleSubmit, reset, setValue, watch } = useForm({
//     defaultValues: { options: [{ option_text: "", is_correct: false }, { option_text: "", is_correct: false }] }
//   });

//   const options = watch("options");

//   const onSubmit = async (data) => {
//     const payload = {
//       question_text: data.question_text,
//       exam_id: data.exam_id || null,
//       options: data.options.map(o => ({ option_text: o.option_text, is_correct: !!o.is_correct })),
//     };

//     const saved = await saveQuestion(payload, editing);
//     if (saved) {
//       reset();
//       setEditing(null);
//       setDrawerOpen(false);
//     }
//   };

//   const columns = [
//     { key: "id", label: "ID" },
//     { key: "question_text", label: "Question" },
//     {
//       key: "created_at", label: "Created",
//       render: (r) => new Date(r.created_at).toLocaleString()
//     }
//   ];

//   const handleEdit = (row) => {
//     const opts = (row.options || []).map(o => ({ option_text: o.option_text, is_correct: !!o.is_correct, id: o.id }));
//     reset({
//       question_text: row.question_text,
//       exam_id: row.exam_id,
//       subject_id: row.subject_id,
//       topic_id: row.topic_id,
//       options: opts.length ? opts : [{ option_text: "", is_correct: false }]
//     });
//     setEditing(row);
//     setDrawerOpen(true);
//   };

//   const addOption = () => {
//     const next = [...(options || []), { option_text: "", is_correct: false }];
//     setValue("options", next);
//   };

//   const removeOption = (idx) => {
//     const next = (options || []).filter((_, i) => i !== idx);
//     setValue("options", next);
//   };

//   return (
//     <div>
//       <Toaster />
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">Questions</h1>
//         <Button onClick={() => { reset(); setEditing(null); setDrawerOpen(true); }}>
//           <Plus className="inline mr-1" size={16} /> Add Question
//         </Button>
//       </div>

//       <Table columns={columns} data={questions} onEdit={handleEdit} onDelete={removeQuestion} />

//       <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Question">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Input label="Question text" {...register("question_text", { required: true })} />
//           <Input label="Exam ID (optional)" {...register("exam_id")} />

//           <div className="mt-3">
//             <label className="block font-semibold">Options</label>
//             {(options || []).map((opt, idx) => (
//               <div key={idx} className="flex items-center gap-2 mt-2">
//                 <input
//                   className="w-5 h-5"
//                   type="checkbox"
//                   checked={!!opt.is_correct}
//                   onChange={(e) => {
//                     const next = (options || []).map((o, i) => i === idx ? { ...o, is_correct: e.target.checked } : o);
//                     setValue("options", next);
//                   }}
//                 />
//                 <input
//                   className="flex-1 border rounded p-2"
//                   placeholder={`Option ${idx + 1}`}
//                   value={opt.option_text}
//                   onChange={(e) => {
//                     const next = (options || []).map((o, i) => i === idx ? { ...o, option_text: e.target.value } : o);
//                     setValue("options", next);
//                   }}
//                 />
//                 <Button type="button" onClick={() => removeOption(idx)}>Remove</Button>
//               </div>
//             ))}
//             <Button type="button" className="mt-3" onClick={addOption}>Add Option</Button>
//           </div>

//           <Button type="submit" className="mt-4 w-full">{editing ? "Update" : "Create"}</Button>
//         </form>
//       </Drawer>
//     </div>
//   );
// }






import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Drawer from "../../components/ui/Drawer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import { Toaster } from "react-hot-toast";
import { Plus } from "lucide-react";
import { useQuestion } from "../../hooks/useQuestion";
import { useExam } from "../../hooks/useExam";

export default function Questions() {
  const { questions, saveQuestion, removeQuestion } = useQuestion();
  const { exams } = useExam(); // Use the hook to fetch exams

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      exam_id: null,
      options: [
        { option_text: "", is_correct: false },
        { option_text: "", is_correct: false },
      ],
    },
  });

  const options = watch("options");

  const onSubmit = async (data) => {
    const payload = {
      question_text: data.question_text,
      exam_id: data.exam_id || null,
      options: data.options.map((o) => ({
        option_text: o.option_text,
        is_correct: !!o.is_correct,
      })),
    };

    const saved = await saveQuestion(payload, editing);
    if (saved) {
      reset();
      setEditing(null);
      setDrawerOpen(false);
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "question_text", label: "Question" },
    {
      key: "created_at",
      label: "Created",
      render: (r) => new Date(r.created_at).toLocaleString(),
    },
  ];

  const handleEdit = (row) => {
    const opts =
      (row.options || []).map((o) => ({
        option_text: o.option_text,
        is_correct: !!o.is_correct,
        id: o.id,
      })) || [{ option_text: "", is_correct: false }];

    reset({
      question_text: row.question_text,
      exam_id: row.exam_id,
      options: opts.length ? opts : [{ option_text: "", is_correct: false }],
    });

    setEditing(row);
    setDrawerOpen(true);
  };

  const addOption = () => {
    const next = [...(options || []), { option_text: "", is_correct: false }];
    setValue("options", next);
  };

  const removeOption = (idx) => {
    const next = (options || []).filter((_, i) => i !== idx);
    setValue("options", next);
  };

  return (
    <div>
      <Toaster />

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Questions</h1>
        <Button
          onClick={() => {
            reset();
            setEditing(null);
            setDrawerOpen(true);
          }}
        >
          <Plus className="inline mr-1" size={16} /> Add Question
        </Button>
      </div>

      <Table
        columns={columns}
        data={questions}
        onEdit={handleEdit}
        onDelete={removeQuestion}
      />

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Question">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Question Text */}
          <Input
            label="Question text"
            {...register("question_text", { required: true })}
          />

          {/* Exam Select */}
          <label className="block mt-3 font-semibold">Exam</label>
          <select
            {...register("exam_id")}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Exam</option>
            {exams.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </select>

          {/* Options */}
          <div className="mt-3">
            <label className="block font-semibold">Options</label>
            {(options || []).map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2 mt-2">
                <input
                  className="w-5 h-5"
                  type="checkbox"
                  checked={!!opt.is_correct}
                  onChange={(e) => {
                    const next = (options || []).map((o, i) =>
                      i === idx ? { ...o, is_correct: e.target.checked } : o
                    );
                    setValue("options", next);
                  }}
                />
                <input
                  className="flex-1 border rounded p-2"
                  placeholder={`Option ${idx + 1}`}
                  value={opt.option_text}
                  onChange={(e) => {
                    const next = (options || []).map((o, i) =>
                      i === idx ? { ...o, option_text: e.target.value } : o
                    );
                    setValue("options", next);
                  }}
                />
                <Button type="button" onClick={() => removeOption(idx)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" className="mt-3" onClick={addOption}>
              Add Option
            </Button>
          </div>

          <Button type="submit" className="mt-4 w-full">
            {editing ? "Update" : "Create"}
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
