<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Approbateur extends Model
{
    use HasFactory;
    protected $table = 'approbateur';
    protected $fillable = ['id', 'utilisateur','id_niveau'];
    
}
