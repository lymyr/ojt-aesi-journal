<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JournalEntryController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/entries', [JournalEntryController::class, 'store']);
Route::get('/entries', [JournalEntryController::class, 'index']);
Route::delete('/entries/{id}', [JournalEntryController::class, 'destroy']);
Route::patch('/entries/{id}', [JournalEntryController::class, 'update']);