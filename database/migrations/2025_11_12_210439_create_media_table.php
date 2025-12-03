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
//        Schema::create('media', function (Blueprint $table) {
//     $table->id();
//     $table->morphs('mediable'); 
//     $table->string('collection_name')->nullable();
//     $table->text('original_url');
//     $table->timestamps();
// });


Schema::create('media', function (Blueprint $table) {
            $table->id();

            // Nullable polymorphic columns
            $table->unsignedBigInteger('mediable_id')->nullable();
            $table->string('mediable_type')->nullable();

            $table->string('collection_name')->nullable();
            $table->text('original_url');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
