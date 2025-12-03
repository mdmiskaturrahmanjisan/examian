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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('type')->nullable();
            $table->unsignedBigInteger('category_id')->nullable();
            $table->unsignedBigInteger('batch_id')->nullable();
            $table->unsignedBigInteger('exam_id')->nullable();
             $table->unsignedBigInteger('user_id')->nullable();
            $table->string('title');
            $table->text('details');
            $table->decimal('new_price', 10, 2);
            $table->decimal('old_price', 10, 2);
            $table->boolean('is_free')->default(0);
            $table->integer('status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
