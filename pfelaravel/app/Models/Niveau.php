<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    use HasFactory;
    protected $table = 'niveau';
    protected $fillable = ['id',  'type_document', 'nom', 'parDefaut'];


    //une relation belongsTo avec le modèle Type_document
    public function typeDocument()
    {
        return $this->belongsTo(Type_document::class, 'type_document', 'id');
    }
  
}
