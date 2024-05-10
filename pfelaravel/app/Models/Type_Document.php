<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Type_document extends Model
{
    protected $table = 'type_document';
    protected $fillable = ['id', 'form', 'nom_type_document', 'description'];
}

