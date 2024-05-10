<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable; 
use Tymon\JWTAuth\Contracts\JWTSubject;
use Laravel\Sanctum\HasApiTokens;
class Utilisateur extends Authenticatable implements JWTSubject
{
    use HasFactory,Notifiable,HasApiTokens;
    protected $table = 'utilisateur';
    protected $fillable = ['nom', 'prenom', 'email', 'password' ];
     protected $hidden = [
        'password'
     ];
     protected $casts =[
        'email_verified_at'=>'datetime',
     ];
    // Ajoutez cette méthode pour récupérer un utilisateur par son adresse email
    public static function getByEmail($email)
    {
        return self::where('email', $email)->first();
    }
    // retourne l'identifiant de l'utilisateur qui sera utilisé pour créer le token JWT.
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
//spécifier des "claims" personnalisés à inclure dans le token JWT
    public function getJWTCustomClaims()
    {
        return [];
    }
}

