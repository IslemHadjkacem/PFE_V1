<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('niveau', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('type_document')->unsigned();
            $table->index('type_document');
            $table->foreign('type_document')->references('id')->on('type_document'); 
            $table->string('nom')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('niveau');
    }
};
