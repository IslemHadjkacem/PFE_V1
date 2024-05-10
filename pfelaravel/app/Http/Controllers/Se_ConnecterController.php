<?php
namespace App\Http\Controllers\Auth;

use App\Models\SeConnecter;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


class Se_ConnecterController extends Controller
{

    
    public function login(Request $request)
    {
        $credentials = $request->only('nom', 'mot_de_passe');
        $user = auth()->user();
        if (auth()->attempt($credentials)) {
            
            return response()->json(['message' => 'Connexion réussie', 'nom' => $user->nom]);
        } else {
            
            return response()->json(['message' => 'Nom d\'utilisateur ou mot de passe incorrect'], 401);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Déconnexion réussie'], 200);
    }
}
    // public function seconnecter(Request $request)
    // {
    //     $credentials = $request->only('nom_utilisateur', 'mot_de_passe');

    //     if (Auth::attempt($credentials)) {
    //         $se_connecter = Auth::se_connecter();
    //         return response()->json(['se_connecter' => $se_connecter]);
    //     }

    //     return response()->json(['error' => 'Unauthorized'], 401);
    // }

    // public function getUtilisateurConnecte(Request $request)
    // {
    //     return response()->json(['se_connecter' => $request->se_connecter()]);
    // }

    // public function utilisateurconnecté (Request $request)
    // {
    //     return response()->json(['utilisateurconnecté' => $request->se_connecter() ? true : false]);
    // }


    // public function login(Request $request)
    // {
    //     $credentials = $request->only('nom','prenom', 'mot_de_passe');

    //     if (auth()->attempt($credentials)) {
    //         // Authentification réussie
    //         return response()->json(['message' => 'Connexion réussie'], 200);
    //     } else {
    //         // Identifiants invalides
    //         return response()->json(['message' => 'Nom ou mot de passe incorrect'], 401);
    //     }
    // }
   

