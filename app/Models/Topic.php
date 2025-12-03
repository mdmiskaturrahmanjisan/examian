<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
   protected $fillable = ['title', 'subject_id'];
   public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function exams()
    {
        return $this->belongsToMany(Exam::class, 'exam_topic');
    }

    public function media()
    {
        return $this->morphMany(Media::class, 'mediable');
    }
}
