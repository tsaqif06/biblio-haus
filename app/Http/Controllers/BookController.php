<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    public function index()
    {
        return response()->json(Book::latest()->get());
    }

    public function indexUser()
    {
        $userId = Auth::id();

        $books = Book::with(['history' => function ($q) use ($userId) {
            $q->where('user_id', $userId);
        }])->get();

        // merge last_opened_at ke setiap book
        $books = $books->map(function ($book) {
            $book->last_opened_at = $book->history->first()?->last_opened_at;
            unset($book->history);
            return $book;
        });

        // sort di backend: yang terakhir dibuka paling atas
        $books = $books->sortByDesc(function ($book) {
            return $book->last_opened_at ? strtotime($book->last_opened_at) : 0;
        })->values(); // values() supaya index rapi 0,1,2...

        return response()->json($books);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string',
            'author'      => 'required|string',
            'category'    => 'nullable|string',
            'description' => 'nullable|string',
            'pdf_file'    => 'required|file|mimes:pdf',
            'cover'       => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['title', 'author', 'category', 'description']);

        if ($request->hasFile('cover')) {
            $data['cover'] = $request->file('cover')->store('cover', 'public');
        }

        if ($request->hasFile('pdf_file')) {
            $data['pdf_file'] = $request->file('pdf_file')->store('pdf', 'public');
        }

        $book = Book::create($data);

        return response()->json($book, 201);
    }

    public function show(Book $book)
    {
        return response()->json($book);
    }

    public function update(Request $request, Book $book)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover' => 'nullable|file|mimes:jpg,jpeg,png',
            'pdf_file' => 'nullable|file|mimes:pdf',
        ]);

        if ($request->hasFile('cover')) {

            if ($book->cover && Storage::disk('public')->exists($book->cover)) {
                Storage::disk('public')->delete($book->cover);
            }

            $data['cover'] = $request->file('cover')->store('cover', 'public');
        } else {
            $data['cover'] = $book->cover;
        }

        if ($request->hasFile('pdf_file')) {

            if ($book->pdf_file && Storage::disk('public')->exists($book->pdf_file)) {
                Storage::disk('public')->delete($book->pdf_file);
            }

            $data['pdf_file'] = $request->file('pdf_file')->store('pdf', 'public');
        } else {
            $data['pdf_file'] = $book->pdf_file;
        }

        $book->update($data);

        return response()->json([
            'message' => 'Book updated successfully',
            'data' => $book
        ]);
    }

    public function destroy(Book $book)
    {
        if ($book->cover && Storage::disk('public')->exists($book->cover)) {
            Storage::disk('public')->delete($book->cover);
        }

        if ($book->pdf_file && Storage::disk('public')->exists($book->pdf_file)) {
            Storage::disk('public')->delete($book->pdf_file);
        }

        $book->delete();

        return response()->json(['message' => 'Book deleted successfully']);
    }
}
