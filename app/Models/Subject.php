<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = ['title'];
    public function topics()
    {
        return $this->hasMany(Topic::class);
    }

    public function exams()
    {
        return $this->belongsToMany(Exam::class, 'exam_subject');
    }
    public function media()
    {
        return $this->morphMany(Media::class, 'mediable');
    }
    
}
