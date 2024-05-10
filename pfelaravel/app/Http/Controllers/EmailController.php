<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendEmail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\Utilisateur;
use Illuminate\Support\Str; 

class EmailController extends Controller
{
    public function sendEmail( $email)

    {
        try {
        $utilisateur = Utilisateur::where('email', $email)->first();

        if ($utilisateur) {
                    
            // Générer un nouveau mot de passe aléatoire
            $newPassword = Str::random(10);
    
            // Hacher le nouveau mot de passe
            $hashedPassword = bcrypt($newPassword);
    
            // Mettre à jour le mot de passe de l'utilisateur dans la base de données avec le mot de passe hashé
            $utilisateur->password = $hashedPassword;
            $utilisateur->save();
            // Mettre à jour le mot de passe de l'utilisateur dans la base de données
    
            // Envoyer un email à l'utilisateur avec le nouveau mot de passe
            $subject = "Reset Password";
            $message = ['password' => $newPassword];
   
        // Envoyer l'e-mail
        Mail::to($email)->send(new SendEmail($subject, $message));
        return response()->json(['message' => "rutrpgp", 'status' => 'success']);
        // Rediriger avec un message de succès
    } else {
        // Si aucun utilisateur correspondant n'est trouvé, retournez une erreur ou une indication
        return response()->json(['message' => 'mail n"existe pas'], 500);
    }
     //   return redirect()->back()->with('status', 'Email envoyé avec succès !');
    } catch (\Exception $e) {
        return response()->json(['message' => $e->getMessage()], 500);
    }
}   

    



}