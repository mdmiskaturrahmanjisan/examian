<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exams', function (Blueprint $table) {
           $table->id();
            $table->string('title');
            $table->integer('duration_minutes')->default(30); 
            $table->float('pass_mark')->default(0); 
            $table->integer('total_questions')->default(0);
            $table->float('marks_per_question')->default(1);
            $table->float('negative_marks_per_question')->default(0);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};
