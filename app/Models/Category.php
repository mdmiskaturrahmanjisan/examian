<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['title'];

    public function media()
    {
        return $this->morphMany(Media::class, 'mediable');
    }
}



