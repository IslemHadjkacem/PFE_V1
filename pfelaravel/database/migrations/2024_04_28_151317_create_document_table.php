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
        Schema::create('document', function (Blueprint $table) {
            $table->id();
            $table->index('type_document');
            $table->index('utilisateur');
            $table->bigInteger('utilisateur')->unsigned();
            $table->bigInteger('type_document')->unsigned();
            $table->foreign('utilisateur')->references('id')->on('utilisateur');
            $table->foreign('type_document')->references('id')->on('type_document'); 
            $table->string('donnees')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document');
    }
};
