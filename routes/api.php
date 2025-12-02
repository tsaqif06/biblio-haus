<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Models\ReadingHistory;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;

Route::middleware('throttle:api')->group(function () {
    Route::get('/public/stats', function () {
        return [
            'total_books' => \App\Models\Book::count(),
            'total_users' => \App\Models\User::count(),
            'total_categories' => \App\Models\Book::distinct('category')->count('category'),
        ];
    });


    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('/books', [BookController::class, 'index']);
        Route::get('/booksuser', [BookController::class, 'indexUser']);
        Route::post('/books', [BookController::class, 'store']);
        Route::get('/books/{book}', [BookController::class, 'show']);
        Route::put('/books/{book}', [BookController::class, 'update']);
        Route::delete('/books/{book}', [BookController::class, 'destroy']);

        Route::get('/users', [AuthController::class, 'fetchAll']);
        Route::post('/users', [AuthController::class, 'store']);
        Route::get('/users/{user}', [AuthController::class, 'show']);
        Route::put('/users/{user}', [AuthController::class, 'update']);
        Route::delete('/users/{user}', [AuthController::class, 'destroy']);

        Route::post('/reading-history/open', function (Request $request) {
            ReadingHistory::updateOrCreate(
                [
                    'user_id' => $request->user()->id,
                    'book_id' => $request->book_id
                ],
                [
                    'last_opened_at' => now(),
                    'progress_page' => 0
                ]
            );

            return response()->json(['success' => true]);
        });
    });
});
