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
        Schema::create('approbateur', function (Blueprint $table) {
            $table->id();
            $table->index('id_niveau');
             $table->index('utilisateur');
            $table->bigInteger('id_niveau')->unsigned();
            $table->bigInteger('utilisateur')->unsigned();
            $table->foreign('id_niveau')->references('id')->on('niveau');
             $table->foreign('utilisateur')->references('id')->on('utilisateur');
           $table->timestamps();
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('approbateur');
    }
};
