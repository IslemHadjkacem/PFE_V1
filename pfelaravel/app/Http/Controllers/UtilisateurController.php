<?php

namespace App\Http\Controllers;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTExceptions;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Utilisateur;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;



class UtilisateurController extends Controller
{
    public function getUtilisateurs()
    {
        try {
            $utilisateurs = Utilisateur::all();
            return response()->json(['message' => "Liste de tous les utilisateurs", 'data' => $utilisateurs, 'status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }
    
        public function getUtilisateurById($id)
    {
        try {
            $utilisateur = Utilisateur::findOrFail($id);
            return response()->json(['data' => $utilisateur, 'status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_NOT_FOUND);
        }
    }
    
    public function addUtilisateur(Request $request)
   {
        try {
        
            $validator = Validator::make($request->all(), [
            
                'email' => 'required|string',
                'nom' => 'required|string',
                'prenom' => 'required|string',
                'password' => 'required|string'
            ]);

            if ($validator->fails()) {
                return response()->json(['status' => 'error', 'message' => $validator->errors()], Response::HTTP_BAD_REQUEST);
            }
            $utilisateurData=$validator->validated();
            $utilisateurData['password']=Hash::make($request->input('password'));
        
            $utilisateurData = utilisateur::create($utilisateurData);
        
            return response()->json(['message' => "utilisateur ajoutee", 'data' => $utilisateurData, 'status' => 'success'], 201);
        } catch (\Exception $e) {
            \Log::error('Error in addUtilisateur: ' . $e->getMessage());
            \Log::error('Request data: ' . json_encode($request->all()));

            return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function updateUtilisateur(Request $request, $id)
    {
            try {
            $utilisateur = Utilisateur::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'id' => 'required|integer',
                
                'email' => 'required|string',
                'nom' => 'required|string',
                'prenom' => 'required|string',
                'password' => 'required|string'
            
            ]);

            if ($validator->fails()) {
                return response()->json(['status' => 'error', 'message' => $validator->errors()], 400);
            }

            $utilisateur->update($validator->validated());

            return response()->json(['message' => 'utilisateur modifié avec succès', 'data' => $utilisateur, 'status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }




    public function deleteUtilisateur(Request $request, $id)
    {
        try {
            $utilisateur = Utilisateur::findOrFail($id);
            $utilisateur->delete();
            return response()->json(['message' => "Utilisateur supprime", 'data' => $utilisateur, 'status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
    }

    public function getUserInfo(Request $request)
    {
        // Récupérer l'utilisateur authentifié
        $user = $request->user();

        // Retourner les informations de l'utilisateur sous forme de réponse JSON
        return response()->json([
            'nom' => $user->nom,
            // Ajoutez d'autres informations de l'utilisateur que vous souhaitez retourner
        ]);
    }

//    public function login(Request $request)
// { $credentials = Validator::make($request->all(), [
//     'email' => 'required|email',
//     'password' => 'required|string',
// ]);
//     // Extraction des informations d'identification de la requête
//     $credentials = $request->only('email', 'password');

//     // Tentative d'authentification de l'utilisateur avec les informations d'identification fournies
//     if (!Auth::attempt($credentials)) {
//         // Si l'authentification échoue, retourne une réponse d'erreur avec un code 401 Unauthorized
//         return response([
//             'message' => 'Invalid credentials!'
//         ], Response::HTTP_UNAUTHORIZED);
//     }

//     // Récupération de l'utilisateur authentifié
//     $user = Auth::user();

//     // Création d'un jeton d'authentification pour l'utilisateur
//     $token = $user->createToken('token')->plainTextToken;
    

//     // Création d'un cookie HTTP contenant le jeton d'authentification
//     $cookie = cookie('jwt', $token, 60 * 24); // 1 jour

//     // Retourne une réponse de succès avec le cookie contenant le jeton d'authentification
//     return response([
//         'message' => 'success'
//     ])->withCookie($cookie);
//     return $this->respondWithToken($token);

// }


public function user()
    {
        return Auth::user();
    }
    
public function logout()
    {
        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'utilisateur est deconnecte avec succes'
        ])->withCookie($cookie);
    }

    public function getUserIdByName($nom)
    {
        try {
            $utilisateur = Utilisateur::where('nom', $nom)->first();
            if ($utilisateur) {
                return response()->json($utilisateur->id);
            } else {
                return response()->json(['error' => 'Utilisateur non trouvé.'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erreur interne du serveur.'], 500);
        }
    }




    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()

        ]);
    }
    public function register(Request $request)
    {
       
    
        $utilisateurData = Utilisateur::create([
            'id' => $request->input(key:'id'),
            'email' => $request->input(key:'email'),
            'nom' => $request->input(key:'nom'),
            'prenom' => $request->input(key:'prenom'),
            // 'mot_de_passe' =>Hash::make( $request->input(key:'mot_de_passe'))
            // 'password' =>Hash::make( $request->input(key:'password'))
            'password' => Hash::make($request->input('password'))
    
           
        ]);
         
        return response()->json(['message' => "Utilisateur ajouté,", 'utilisateurData' => $utilisateurData, "statusCode" => 200]);
    }
    public function login(Request $request)
    { $credentials = Validator::make($request->all(), [
        'email' => 'required|email',
        'password' => 'required|string',
    ]);
        // Extraction des informations d'identification de la requête
        $credentials = $request->only('email', 'password');
    
        // Tentative d'authentification de l'utilisateur avec les informations d'identification fournies
        if (!Auth::attempt($credentials)) {
            // Si l'authentification échoue, retourne une réponse d'erreur avec un code 401 Unauthorized
            return response([
                'message' => 'Invalid credentials!'
            ], Response::HTTP_UNAUTHORIZED);
        }
    
        // Récupération de l'utilisateur authentifié
        $user = Auth::user();
    
        // Création d'un jeton d'authentification pour l'utilisateur
        $token = $user->createToken('token')->plainTextToken;
        
    
        // Création d'un cookie HTTP contenant le jeton d'authentification
        $cookie = cookie('jwt', $token, 60 * 24); // 1 jour
    
        // Retourne une réponse de succès avec le cookie contenant le jeton d'authentification
        return response([
            'message' => 'success'
        ])->withCookie($cookie);
        return $this->respondWithToken($token);
    
    }
    
    
    // public function user()
    //     {
    //         return Auth::user();
    //     }
        
    // public function logout()
    //     {
    //         $cookie = Cookie::forget('jwt');
    
    //         return response([
    //             'message' => 'utilisateur est deconnecte avec succes'
    //         ])->withCookie($cookie);
    //     }
    
    //     public function getUserIdByName($nom)
    //     {
    //         try {
    //             $utilisateur = Utilisateur::where('nom', $nom)->first();
    //             if ($utilisateur) {
    //                 return response()->json($utilisateur->id);
    //             } else {
    //                 return response()->json(['error' => 'Utilisateur non trouvé.'], 404);
    //             }
    //         } catch (\Exception $e) {
    //             return response()->json(['error' => 'Erreur interne du serveur.'], 500);
    //         }
    //     }
    
    
    
    // public function logout()
    // {
    //     try {
    //         // Suppression du cookie JWT
    //         $cookie = cookie('jwt', null, -1); // Mettre le cookie à une date antérieure pour le supprimer
    
    //         // Déconnexion de l'utilisateur
    //         Auth::logout();
    
    //         // Retourner une réponse de succès avec le cookie supprimé
    //         return response()->json(['message' => 'Utilisateur déconnecté avec succès'], 200)->withCookie($cookie);
    //     } catch (\Exception $e) {
    //         // En cas d'erreur, retourner une réponse d'erreur
    //         return response()->json(['message' => 'Erreur lors de la déconnexion: ' . $e->getMessage()], 500);
    //     }
    // }
    
    //     public function refresh()
    //     {
    //         return $this->respondWithToken(auth()->refresh());
    //     }
    
    //     /**
    //      * Get the token array structure.
    //      *
    //      * @param  string $token
    //      *
    //      * @return \Illuminate\Http\JsonResponse
    //      */
    //     protected function respondWithToken($token)
    //     {
    //         return response()->json([
    //             'access_token' => $token,
    //             'token_type' => 'bearer',
    //             'expires_in' => auth()->factory()->getTTL() * 60,
    //             'user' => auth()->user()
    
    //         ]);
    //     }
    //     public function register(Request $request)
    //     {
           
        
    //         $utilisateurData = Utilisateur::create([
    //             'id' => $request->input(key:'id'),
    //             'email' => $request->input(key:'email'),
    //             'nom' => $request->input(key:'nom'),
    //             'prenom' => $request->input(key:'prenom'),
    //             // 'mot_de_passe' =>Hash::make( $request->input(key:'mot_de_passe'))
    //             // 'password' =>Hash::make( $request->input(key:'password'))
    //             'password' => Hash::make($request->input('password'))
        
               
    //         ]);
             
    //         return response()->json(['message' => "Utilisateur ajouté,", 'utilisateurData' => $utilisateurData, "statusCode" => 200]);
    //     }
    
    }
    


















