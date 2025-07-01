<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;

Route::post('/login', [LoginController::class, 'authenticate']);


// Route::get('/', function () {
//     return view('welcome');
// });
