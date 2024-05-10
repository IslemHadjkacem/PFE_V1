// import { Component, NgZone, OnInit } from '@angular/core';
// import {  Router } from '@angular/router';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { UtilisateurService } from 'src/app/shared/services/utilisateur.service';
// import { MessageService, ConfirmationService } from 'primeng/api';
// // import {SnotifyService}from 'ng-snotify' ;
// @Component({
//   selector: 'app-mdp-oubliee',
//   templateUrl: './mdp-oubliee.component.html',
//   styleUrls: ['./mdp-oubliee.component.scss'],
//   providers: [MessageService, ConfirmationService,UtilisateurService]
// })
// export class MdpOublieeComponent implements OnInit {

//   dark: boolean;
//   checked: boolean;
//   mdpForm: FormGroup;
//   operation: 'add' 
//   public form = {
//     email: null
//   };


//   constructor(
//     private fb: FormBuilder, 
//     private utilisateurService: UtilisateurService,
//     public messageService:MessageService,
//     private router:Router,
    
//     // private notify:SnotifyService
//   ) { }
  

//   ngOnInit(): void {


//   }
 

  
//   onSubmit() {
//     this.utilisateurService.sendPasswordResetLink(this.form).subscribe(
//       data => this.handleResponse(data),
         
//       // error => this.notify.error(error.error.error)
//     );
     
      
//     this.form.email = null
//   }

//   handleResponse(res) {
//     console.log(res)
//     this.form.email=null;

//     }

//   }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeConnecterService } from 'src/app/shared/services/se-connecter.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-mdp-oubliee',
  templateUrl: './mdp-oubliee.component.html',
  styleUrls: ['./mdp-oubliee.component.scss'],
  providers: [MessageService, ConfirmationService,SeConnecterService]
})
export class MdpOublieeComponent implements OnInit {

  mdpForm: FormGroup;
  public form = {
    email: null
  };

  constructor(
    private fb: FormBuilder, 
    private seConnecterService: SeConnecterService,
    public messageService: MessageService,
  ) {
    // Initialisez le formulaire dans le constructeur
    this.mdpForm = this.fb.group({
      email: [null, Validators.required] // Associez le champ email à un contrôle et ajoutez une validation si nécessaire
    });
  }

  ngOnInit(): void {}

  // onSubmit() {
  //   this.seConnecterService.sendEmail(this.form).subscribe(
  //     data => this.handleResponse(data),
  //     error => this.handleError(error)
  //   );
  //   this.form.email = null;
  // }




  // handleResponse(res) {
  //   this.messageService.add({ severity: 'success', summary: 'Email existe', detail: 'Vérifiez votre e-mail pour réinitialiser votre mot de passe.' });
  // }
  
  // handleError(error) {
  //   if (error.status === 500) {
  //     this.messageService.add({ severity: 'error', summary: 'Email n\'existe pas', detail: 'L\'e-mail saisi n\'existe pas.' });
  //   } else {
  //     console.error(error);
  //   }
  // }

  // onSubmit() {
  //   this.seConnecterService.sendEmail(this.mdpForm.value.email).subscribe(
  //     () => {
  //       console.log(this.messageService)
  //       this.messageService.add({ severity: 'success', summary: 'Email existe', detail: 'Vérifiez votre e-mail pour réinitialiser votre mot de passe.' });
  //       // Réinitialiser le formulaire
  //       this.mdpForm.reset();
  //     },
  //     (error) => {
  //       if (error.status === 500) {
  //         this.messageService.add({ severity: 'error', summary: 'Email n\'existe pas', detail: 'L\'e-mail saisi n\'existe pas.' });
  //       } else {
  //         console.error(error);
  //       }
  //     }
  //   );
  // }


  onSubmit() {
    this.seConnecterService.sendEmail(this.mdpForm.value.email).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Email existe', detail: 'Vérifiez votre e-mail pour réinitialiser votre mot de passe.' });
        // Réinitialiser le formulaire
        this.mdpForm.reset();
      },
      (error) => {
        if (error.status === 500) {
          this.messageService.add({ severity: 'error', summary: 'Email n\'existe pas', detail: 'L\'e-mail saisi n\'existe pas.' });
        } else {
          console.error(error);
        }
      }
    );
  }
  
}


