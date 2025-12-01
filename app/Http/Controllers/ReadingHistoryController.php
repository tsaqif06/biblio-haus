<?php 

namespace App\Http\Controllers;

use App\Models\ReadingHistory;
use Illuminate\Http\Request;

class ReadingHistoryController extends Controller
{
    public function updateProgress(Request $request)
    {
        $request->validate([
            'book_id' => 'required',
            'progress_page' => 'required|integer',
        ]);

        $history = ReadingHistory::updateOrCreate(
            [
                'user_id' => $request->user()->id,
                'book_id' => $request->book_id
            ],
            [
                'last_opened_at' => now(),
                'progress_page' => $request->progress_page
            ]
        );

        return $history;
    }

    public function list(Request $request)
    {
        return ReadingHistory::where('user_id', $request->user()->id)
            ->with('book')
            ->orderByDesc('last_opened_at')
            ->get();
    }
}
