<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
       protected $fillable = [
        'type','category_id','batch_id','exam_id','user_id','title','details','new_price','old_price','status'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function media() { return $this->morphMany(Media::class, 'mediable'); }
    public function user() { return $this->belongsTo(User::class); }
}
