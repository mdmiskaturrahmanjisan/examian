<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Batch extends Model
{
    protected $fillable = [
        'title','user_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function media() { return $this->morphMany(Media::class, 'mediable'); }
    public function user() { return $this->belongsTo(User::class); }
}

