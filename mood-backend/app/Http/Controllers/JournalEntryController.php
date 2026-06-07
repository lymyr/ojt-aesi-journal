<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JournalEntry;
use Illuminate\Support\Facades\DB;

class JournalEntryController extends Controller
{
    public function getPage(Request $request)
    {
        $sort = $request->query('sort', 'asc');
        $mood = $request->query('mood');
        $query = JournalEntry::orderBy('date', $sort);

        if ($mood) {
            $query->where('mood', $mood);
        }

        return $query->paginate(8);
    }
    public function getMoods()
    {
        $moods = DB::table('journal_entries')
            ->select('mood')
            ->distinct()
            ->orderByRaw("field(mood, 'Great', 'Good', 'Neutral', 'Bad', 'Horrible')")
            ->pluck('mood');

        return response()->json($moods);
    }

    public function destroy($id)
    {
        $entry = JournalEntry::findOrFail($id);
        $entry->delete();

        return response()->json(['message' => 'Entry deleted successfully.']);
    }

    public function getMonthlyEntries($yearMonth)
    {
        if (!preg_match('/^\d{4}-\d{2}$/', $yearMonth)) {
            return response()->json(['error' => 'Invalid format. Use YYYY-MM'], 400);
        }
        return JournalEntry::where('date', 'like', $yearMonth . '%')
            ->orderBy('date', 'asc')
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mood' => 'required|string',
            'journal_entry' => 'nullable|string',
            'date' => 'required|date',
        ]);

        $entry = \App\Models\JournalEntry::updateOrCreate(
            ['date' => $validated['date']],
            $validated                    
        );
    
        return response()->json(['message' => 'Saved', 'entry' => $entry], 201);
    }

}
