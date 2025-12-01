<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'category',
        'description',
        'cover',
        'pdf_file'
    ];

    public function history()
    {
        return $this->hasMany(ReadingHistory::class);
    }
}
