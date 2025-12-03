<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    BannerController,
    CategoryController,
    SubCategoryController,
    SubjectController,
    TopicController,
    CouponController,
    BatchController,
    MediaController,
    PublicController,
    DashboardController,
    ExamController,
    CourseController,
    QuestionController,
    UserExamController,
    AuthController,
};

Route::get('/data', [PublicController::class, 'index']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout',     [AuthController::class, 'logout']);
    Route::get('/profile',     [AuthController::class, 'profile']);
    Route::post('/profile',    [AuthController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    Route::apiResource('banners', BannerController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('sub-categories', SubCategoryController::class);
    Route::apiResource('subjects', SubjectController::class);
    Route::apiResource('topics', TopicController::class);
    Route::apiResource('coupons', CouponController::class);
    Route::apiResource('batches', BatchController::class);
    Route::apiResource('courses', CourseController::class);

    Route::get('/media', [MediaController::class, 'index']);
    Route::post('/media', [MediaController::class, 'store']);
    Route::post('/media/attach', [MediaController::class, 'attach']);
    Route::post('/media/detach', [MediaController::class, 'detach']);

    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::apiResource('exams', ExamController::class);
    Route::apiResource('questions', QuestionController::class);
    Route::post('exams/{exam}/start', [UserExamController::class,'start']);
    Route::post('user-exams/save-answer', [UserExamController::class,'saveAnswer']);
    Route::get('user-exams/{id}/resume', [UserExamController::class,'resume']);
    Route::post('user-exams/{id}/submit', [UserExamController::class,'submit']);
});
