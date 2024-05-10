<?php

namespace Tests\Unit;

use Illuminate\Support\Facades\Mail;
use App\Mail\SendEmail;
use Tests\TestCase;

class EmailTest extends TestCase
{
    public function testSendEmail()
    {
        // Indiquer à Laravel de remplacer les envois d'e-mails réels par des faux pour ce test
        Mail::fake();

        // Envoyer une requête POST à votre endpoint d'envoi d'e-mails avec des données de test
        $response = $this->post('/api/send-email', [
            'subject' => 'Test Email',
            'message' => 'Ceci est un e-mail de test.',
            'recipient' => 'recipient@example.com'
        ]);

        // Vérifier que la réponse a un code de statut HTTP 200
        $response->assertStatus(200);

        // Vérifier que l'e-mail a été envoyé avec les données attendues
        Mail::assertSent(SendEmail::class, function ($mail) {
            // Vérifier que le sujet de l'e-mail est correct
            return $mail->subject === 'Test Email';
        });
    }
}
