<?php

use App\Models\Book;
use Illuminate\Support\Facades\Route;

Route::get('/read/{slug}', function ($slug) {
    $book = Book::whereRaw('LOWER(REPLACE(title, " ", "-")) = ?', [strtolower($slug)])->firstOrFail();

    $path = storage_path('app/public/' . $book->pdf_file);

    return response()->file($path);
});

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
