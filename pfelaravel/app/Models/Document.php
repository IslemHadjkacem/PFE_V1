<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    
    protected $table = 'document';
    protected $fillable = ['id',  'type_document', 'utilisateur', 'donnees','id_niveau','id_etat','message'];

    public function utilisateur()
{
    return $this->belongsTo(Utilisateur::class, 'utilisateur','nom');
}

}
