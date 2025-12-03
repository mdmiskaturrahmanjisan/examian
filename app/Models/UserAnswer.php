<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class UserAnswer extends Model
{
    protected $fillable = ['user_exam_id','question_id','selected_option_ids'];

    protected $casts = [
        'selected_option_ids' => 'array'
    ];

    public function userExam() {
        return $this->belongsTo(UserExam::class);
    }

    public function question() {
        return $this->belongsTo(Question::class);
    }
}
