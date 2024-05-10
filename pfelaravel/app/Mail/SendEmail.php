<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;


class SendEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $subject;
    public $password;

    public function __construct($subject, $message)
    {
        $this->subject = $subject;
        $this->password = $message['password'];
    }

    public function build()
    {
        return $this->subject($this->subject)
                    //->markdown('emails.custom');
                    ->view('Email.email');
    }}
    // use Queueable, SerializesModels;

    // public $subject = 'Sujet de l\'email';

    // public $data;
    // /**
    //  * Create a new message instance.
    //  */
    // public function __construct($data)
    // {
    //      $this->data = $data;
    // }
    

    // public function build()
    // {
    //     return $this->view('Email.email') 
    //                 ->with('data', $this->data);
    // }
    // /**
    //  * Get the message envelope.
    //  */
    // public function envelope(): Envelope
    // {
    //     return new Envelope(
    //         subject: 'Send Email',
    //     );
    // }

    // /**
    //  * Get the message content definition.
    //  */
    // public function content(): Content
    // {
    //     return new Content(
    //         view: 'Email.email',
    //     );
    // }

    // /**
    //  * Get the attachments for the message.
    //  *
    //  * @return array<int, \Illuminate\Mail\Mailables\Attachment>
    //  */
    // public function attachments(): array
    // {
    //     return [];
    // }


  
