<?php

use Illuminate\Support\Facades\Route;

// Catch-all route for React Router
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');