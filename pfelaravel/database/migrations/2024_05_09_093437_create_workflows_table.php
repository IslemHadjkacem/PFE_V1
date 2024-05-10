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
        Schema::create('workflows', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_niveau')->unsigned();
            $table->index('id_niveau');
            $table->foreign('id_niveau')->references('id')->on('niveau'); 


            $table->bigInteger('id_etat')->unsigned();
            $table->index('id_etat');
            $table->foreign('id_etat')->references('id')->on('etat'); 

            $table->bigInteger('id_doc')->unsigned();
            $table->index('id_doc');
            $table->foreign('id_doc')->references('id')->on('document');
             
            $table->string('message')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workflows');
    }
};
