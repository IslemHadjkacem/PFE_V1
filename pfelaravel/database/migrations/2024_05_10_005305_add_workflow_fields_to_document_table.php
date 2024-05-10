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
        Schema::table('document', function (Blueprint $table) {
            $table->bigInteger('id_niveau')->unsigned()->nullable();
            $table->index('id_niveau');
            $table->foreign('id_niveau')->references('id')->on('niveau');
        
            $table->bigInteger('id_etat')->unsigned()->nullable();
            $table->index('id_etat');
            $table->foreign('id_etat')->references('id')->on('etat');
        
            $table->bigInteger('id_doc')->unsigned()->nullable();
            $table->index('id_doc');
            $table->foreign('id_doc')->references('id')->on('document');
        
            $table->string('message')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('document', function (Blueprint $table) {
            $table->dropForeign(['id_niveau']);
            $table->dropColumn('id_niveau');
        
            $table->dropForeign(['id_etat']);
            $table->dropColumn('id_etat');
        
            $table->dropForeign(['id_doc']);
            $table->dropColumn('id_doc');
        
            $table->dropColumn('message');
        });
    }
};
