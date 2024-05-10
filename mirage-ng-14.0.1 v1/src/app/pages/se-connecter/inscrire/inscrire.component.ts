import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import {  Router } from '@angular/router';
import { UtilisateurService } from 'src/app/shared/services/utilisateur.service';
import { first } from 'rxjs';
@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  styleUrls: ['./inscrire.component.scss'],
  providers: [MessageService, ConfirmationService,UtilisateurService]
})
export class InscrireComponent implements OnInit {
  dark: boolean;
  checked: boolean;
  registerForm: FormGroup;
  operation: 'add' 
  constructor(private fb: FormBuilder, 
    private router:Router,
    private utilisateurService: UtilisateurService, ) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]],
 
    });
  }
 

  ngOnInit(): void {
    
  }

  onSubmit() {
    if (this.operation == 'add') {
      this.insertData()
    }}



  insertData() {
    if (this.registerForm.valid) {
      console.log('Données envoyées au serveur :', this.registerForm.value);
      this.utilisateurService.addUtilisateur(this.registerForm.value).subscribe(
        (response) => {
          console.log('Réponse du serveur :', response);
        
          this.registerForm.reset();
        },
        (error) => {
          console.error('Erreur d\'ajout de ', error);

          if (error && error.error && error.error.message) {
            console.error('Message d\'erreur du serveur :', error.error.message);
          }

          if (error && error.error && error.error.errors) {
            console.error('Erreurs détaillées du serveur :', error.error.errors);
          }
        }
      );
    } else {
      console.error('Formulaire invalide. Veuillez remplir tous les champs requis.');
    }
  }
  get nom() { return this.registerForm.get('nom'); }
  get prenom() { return this.registerForm.get('prenom'); }
  get mot_de_passe() { return this.registerForm.get('mot_de_passe'); }
  
}




    // getUtilisateurData() {
    //   this.utilisateurService.getUtilisateurs().subscribe(
    //     (utilisateurs: any) => {
    //       this.utilisateurs = utilisateurs.data;
    //       console.log(this.utilisateurs)
    //     },
    //     (error) => {
    //       console.error('Erreur lors de la récupération des utilisateurs :', error);
    //     }
    //   );
    // }


    
   // register(registerForm:NgForm)
  // {
  //   this.utilisateurService.userregistration(registerForm.value.nom,
  //     registerForm.value.prenom,
  //     registerForm.value.mot_de_passe,)
  //     .pipe(first())
  //     .subscribe(
  //         data => {
  //             this.router.navigate(['login']);
  //         },
  //         error => {
  //         });
  // }

  // register() {
  //   if (this.registerForm.invalid) {
  //     // Gérer les erreurs de validation du formulaire
  //     return;
  //   }
  
  //   this.utilisateurService.registerUtilisateur(
  //     this.registerForm.value.nom,
  //     this.registerForm.value.prenom,
  //     this.registerForm.value.mot_de_passe)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         this.router.navigate(['login']);
  //       },
  //       error => {
  //         // Gérer les erreurs de l'inscription
  //       }
  //     );
  // }
  // register() {
  //   if (this.registerForm.invalid) {
  //     // Gérer les erreurs de validation du formulaire
  //     return;
  //   }

  //   // Traitement de l'inscription ici
  //   console.log(this.registerForm.value);
  // }

  // sendResetLink() {
  //   // Logique pour envoyer un lien de réinitialisation de mot de passe
  // }


