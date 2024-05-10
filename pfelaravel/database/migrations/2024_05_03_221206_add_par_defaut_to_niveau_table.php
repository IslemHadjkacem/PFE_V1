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
        Schema::table('niveau', function (Blueprint $table) {
           
                $table->boolean('parDefaut')->default(false);
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('niveau', function (Blueprint $table) {
            $table->dropColumn('parDefaut');
        });
    }
};
