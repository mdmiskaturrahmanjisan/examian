<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class UserExam extends Model
{
    protected $fillable = [
        'user_id','exam_id','started_at','expires_at','is_submitted','score','submitted_at'
    ];

    protected $dates = [
        'started_at','expires_at','submitted_at'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function exam() {
        return $this->belongsTo(Exam::class);
    }

    public function answers() {
        return $this->hasMany(UserAnswer::class);
    }
}
