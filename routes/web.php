<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Models\Task;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome'); // Ensure you have a Welcome component in your resources/js/Pages directory
})->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get("/dashboard", [DashboardController::class, "index"])->name("dashboard");
    Route::resource("project", ProjectController::class);
    Route::get("/task/my-tasks", [TaskController::class, "myTasks"])->name("task.myTasks");
    Route::resource("task", TaskController::class);

    Route::get('task/create/{project}', [TaskController::class, 'create'])->name('task.create');
    Route::get('project/{project}/task/{task}', [TaskController::class, 'show'])->name('task.show');
    Route::get('project/{project}/task/{task}/edit', [TaskController::class, 'edit'])->name('task.edit');


    Route::get('project/{project}/join', [ProjectController::class, 'join'])->name('project.join');
    Route::post('project/{project}/leave', [ProjectController::class, 'leave'])->name('project.leave');


    Route::resource("user", UserController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
