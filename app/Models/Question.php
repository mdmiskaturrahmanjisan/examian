<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'exam_id','question_text','meta'
    ];

    protected $casts = [
        'meta' => 'array',
    ];

    public function exam() {
        return $this->belongsTo(Exam::class);
    }

    // public function subject() {
    //     return $this->belongsTo(Subject::class);
    // }

    // public function topic() {
    //     return $this->belongsTo(Topic::class);
    // }

    public function options() {
        return $this->hasMany(QuestionOption::class);
    }
}
