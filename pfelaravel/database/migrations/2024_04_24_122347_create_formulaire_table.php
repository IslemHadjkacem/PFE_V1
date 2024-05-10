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
        Schema::create('formulaire', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('type_document')->unsigned();
            $table->index('type_document');
            $table->foreign('type_document')->references('id')->on('type_document'); 
            $table->string('nom_utilisateur')->nullable();
            $table->string('donnees')->nullable();
           
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('formulaire');
    }
};
