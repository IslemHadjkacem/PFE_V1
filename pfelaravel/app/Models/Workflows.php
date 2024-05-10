<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workflows extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_niveau', 'id_etat', 'id_doc','message'
    ];

    public function document()
    {
        return $this->belongsTo(Document::class, 'id_doc');
    }

    public function etat()
    {
        return $this->belongsTo(Etat::class, 'id_etat');
    }

    public function niveau()
    {
        return $this->belongsTo(Niveau::class, 'id_niveau');
    }
}

