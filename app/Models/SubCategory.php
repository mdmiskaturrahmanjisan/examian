<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    protected $fillable = ['title', 'category_id'];

    public function media()
    {
        return $this->morphMany(Media::class, 'mediable');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
