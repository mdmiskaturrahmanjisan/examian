<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $fillable = ['type', 'related_id'];
    public function media() { return $this->morphMany(Media::class, 'mediable'); }
}

