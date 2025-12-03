<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Subject;
use App\Models\Topic;
use App\Models\Exam;
use App\Models\Question;

class ExamSeeder extends Seeder
{
    public function run(): void
    {
        // Create 1 subject
        $subject = Subject::create([
            'title' => 'Bangla'
        ]);

        // Create topic
        $topic = Topic::create([
            'title'      => 'Grammar',
            'subject_id' => $subject->id,
        ]);

        // Create exam
        $exam = Exam::create([
            'title'                    => 'Bangla Quick Test',
            'duration_minutes'         => 20,
            'pass_mark'                => 10,
            'marks_per_question'       => 2,
            'negative_marks_per_question' => 0.25,
        ]);

        // Attach relations
        $exam->subjects()->attach($subject->id);
        $exam->topics()->attach($topic->id);

        // Create question
        $question = Question::create([
            'exam_id'    => $exam->id,
            'question_text' => 'Select vowels',
        ]);

        // Create options
        $question->options()->createMany([
            ['option_text' => 'A', 'is_correct' => true],
            ['option_text' => 'B', 'is_correct' => false],
            ['option_text' => 'E', 'is_correct' => true],
            ['option_text' => 'F', 'is_correct' => false],
        ]);
    }
}
