<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Mail\SendMail;
use App\Http\Requests\RequestHelper;
use Carbon\Carbon; //une bibliothèque de gestion de la date et de l'heure 
use App\Models\Utilisateur;
use Illuminate\Mail\Message;

class Mot_de_passeController extends Controller
{

  public function sendEmail(Request $request)
  {
    if (!$this->validateEmail($request->email)){
      return $this->failedResponse();

    }
    // return $request->all();
    $this->email($request->email);
    return $this->successResponse();
  }
  
  public function send($email)
  {
    Mail::to($email)->send( new ResetPasswordMail());
  }

  public function validateEmail($email)
  {
    return !!Utilisateur::where('email',$email)->first();
  }


 public function failedResponse()
 {
  return response()->json([
    'error' =>'Email does\'t found on our database'
  ],Response::HTTP_Not_FOUND);
 }



 public function successResponse()
 {
  return response()->json([
    'data' =>' Reset Email is send successfully ,please check your inbox.'
  ],Response::HTTP_OK);
 }

}









































































    
    // public function forgot(Request $request)
    // {
    //     $email = $request->input('email');
    //     $token = Str::random(12);

    //     DB::table('mdp_modifiee')->insert([
    //         'email' => $email,
    //         'token' => $token,
    //         'created_at' => Carbon::now(),
    //         'expires_at' => Carbon::now()->addHours(2) // Expiration du jeton dans 2 heures
    //     ]);

    //     Mail::send('reset', ['token' => $token], function (Message $message) use ($email) {
    //         $message->subject('Réinitialisez votre mot de passe');
    //         $message->to($email);
    //     });

    //     return [
    //         'message' => '
    //         Vérifiez votre courrier électronique'
    //     ];
    // }
    // public function reset(Request $request)
    // {
    //     if ($request->input('password') !== $request->input('password_confirm')) {
    //         return response([
    //             'error' => 'Les mots de passe ne correspondent pas'
    //         ], 400);
    //     }

    //     $passwordReset = DB::table('mdp_modifiee')->where('token', $request->input('token'))->first();

    //     if (!$passwordReset || Carbon::now()->gt($passwordReset->expires_at)) { // Vérification de l'expiration du jeton
    //         return response([
    //             'error' => 'Jeton de réinitialisation du mot de passe invalide ou expiré'
    //         ], 400);
    //     }

    //     $utilisateur = Utilisateur::where('email', $passwordReset->email)->first();

    //     if (!$user) {
    //         return response([
    //             'error' => 'E-mail introuvable dans la base de données'
    //         ], 404);
    //     }

    //     $utilisateur->password = Hash::make($request->input('password'));
    //     $utilisateur->save();

    //     // Supprimer le jeton utilisé de la table mdp_modifiee
    //     DB::table('mdp_modifiee')->where('token', $request->input('token'))->delete();

    //     return [
    //         'message' => 'Mot de passe réinitialisé avec succès'
    //     ];
    // }


    
    // public function updatePass(Request $request, $id){
    //     $utilisateur = Utilisateur::find($id);
    //     if (is_null($utilisateur)) {
    //         return response()->json(['message' => 'Produit introuvable'], 404);
    //     }
    //     $request->validate([
    //         'current_password' => 'required|string', // Validation for the current password field
    //         'new_password' => 'required|string',
    //     ]);
    //     if (!Hash::check($request->input('current_password'), $utilisateur->password)) {
    //         return response()->json(['message' => 'Ce mot de passe est incorrect'], 400);
    //     }
    //     $utilisateur->password = bcrypt($request->input('new_password'));
    //     $utilisateur->save();
    //     return response($utilisateur, 200);

    // }

    // public function reqForgotPassword(Request $request){
    //     if(!$this->validEmail($request->email)) {
    //         return response()->json([
    //             'message' => 'Email not found.'
    //         ], Response::HTTP_NOT_FOUND);
    //     } else {
    //         $this->sendEmail($request->email);
    //         return response()->json([
    //             'message' => 'Password reset mail has been sent.'
    //         ], Response::HTTP_OK);
    //     }
    // }





















































// code 9dim video token

    // public function sendEmail($email){
    //     $token = $this->createToken($email);
    //     Mail::to($email)->send(new SendMail($token));
    // }

    // public function validEmail($email) {
    //    return !!User::where('email', $email)->first();
    // }

    // public function createToken($email){
    //   $isToken = DB::table('password_resets')->where('email', $email)->first();

    //   if($isToken) {
    //     return $isToken->token;
    //   }

    //   $token = Str::random(80);;
    //   $this->saveToken($token, $email);
    //   return $token;
    // }

    // public function saveToken($token, $email){
    //     DB::table('password_resets')->insert([
    //         'email' => $email,
    //         'token' => $token,
    //         'created_at' => Carbon::now()            
    //     ]);
    // }



    // public function updatePassword(RequestHelper $request){
    //     return $this->validateToken($request)->count() > 0 ? $this->changePassword($request) : $this->noToken();
    // }

    // private function validateToken($request){
    //     return DB::table('password_resets')->where([
    //         'email' => $request->email,
    //         'token' => $request->passwordToken
    //     ]);
    // }

    // private function noToken() {
    //     return response()->json([
    //       'error' => 'Email or token does not exist.'
    //     ],Response::HTTP_UNPROCESSABLE_ENTITY);
    // }

    // private function changePassword($request) {
    //     $user = User::whereEmail($request->email)->first();
    //     $user->update([
    //       'password'=>bcrypt($request->password)
    //     ]);
    //     $this->validateToken($request)->delete();
    //     return response()->json([
    //       'data' => 'Password changed successfully.'
    //     ],Response::HTTP_CREATED);
    // }  

























































    // public function forgot(Request $request)
    // {
    //     $email = $request->input('email');
    //     $token = Str::random(12);

    //     DB::table('mdp_modifiee')->insert([
    //         'email' => $email,
    //         'token' => $token,
    //         'created_at' => Carbon::now()
    //     ]);

    //     Mail::send('reset', ['token' => $token], function (Message $message) use ($email) {
    //         $message->subject('Reset Your Password');
    //         $message->to($email);
    //     });

    //     return [
    //         'message' => 'Check your email'
    //     ];
    // }




//     public function reset(Request $request)
// {
//     if ($request->input('password') !== $request->input('password_confirm')) {
//         return response([
//             'error' => '
//             Les mots de passe ne correspondent pas'
//         ], 400);
//     }

//     $passwordReset = DB::table('mdp_modifiee')->where('token', $request->input('token'))->first();

//     if (!$passwordReset) {
//         return response([
//             'error' => 'Utilisateur non trouvé'
//         ], 404);
//     }

//     $user = User::where('email', $passwordReset->email)->first();

//     if (!$user) {
//         return response([
//             'error' => 'Utilisateur non trouvé'
//         ], 404);
//     }

//     $user->password = Hash::make($request->input('password'));
//     $user->save();

//     return [
//         'message' => 'Mot de passe réinitialisé avec succès'
//     ];
// }

    


