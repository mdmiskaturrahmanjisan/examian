<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $fillable = [
        'title',
        'duration_minutes',
        'pass_mark',
        'total_questions',
        'marks_per_question',
        'negative_marks_per_question',
        'description'
    ];

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'exam_subject');
    }

    public function topics()
    {
        return $this->belongsToMany(Topic::class, 'exam_topic');
    }
      public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
