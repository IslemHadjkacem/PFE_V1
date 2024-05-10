import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SeConnecterService } from 'src/app/shared/services/se-connecter.service';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';

import { TokenService } from 'src/app/shared/services/token.service';
@Component({
  selector: 'app-se-connecter',
  templateUrl: './se-connecter.component.html',
  styleUrls: ['./se-connecter.component.scss'],
  providers: [MessageService, ConfirmationService,SeConnecterService]
})
export class SeConnecterComponent implements OnInit {
  dark: boolean;
  checked: boolean;
  loginForm !: FormGroup;
  credentials:any;
  err = null;
nom:string | null = null;
  constructor(
    private formBuilder: FormBuilder, 
    private seConnecterService: SeConnecterService,
    private router: Router,
    private messageService: MessageService,
    private tokenService:TokenService,
   
  ) {
   
  }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    
       
    });
  }

 
  // login(): void {
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   const email = this.loginForm.get('email').value;
  //   const password = this.loginForm.get('password').value;

  //   this.seConnecterService.login(email, password).subscribe(
  //     (response: any) => {
  //       const token = this.tokenService.getTokenFromCookie(); // Récupérer le token
  //      // const nom = this.extractUsernameFromToken(token); // Extraire le nom d'utilisateur depuis le token
  //       if (nom) {
  //         this.nom = nom; // Stocker le nom d'utilisateur connecté
  //       }
  //       this.router.navigate(['/']); // Rediriger vers le tableau de bord
  //     },
  //     (error) => {
  //       console.error(error);
  //       this.messageService.add({ severity: 'error', summary: 'Erreur de connexion', detail: 'Nom d\'utilisateur ou mot de passe incorrect' });
  //     }
  //   );
  // }

  // private extractUsernameFromToken(token: string): string | null {
  //     // Logique pour extraire le nom d'utilisateur depuis le token
  // // Retournez le nom d'utilisateur ou null s'il n'est pas disponible
  // // Par exemple, si le token contient le nom d'utilisateur après le mot "user:", vous pouvez utiliser cette logique :
  // const tokenParts = token.split('user:');
  // if (tokenParts.length > 1) {
  //   return tokenParts[1];
  // } else {
  //   return null;
  // }
  // }
  login ():void {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    
    this.seConnecterService.login(email, password).subscribe(
      response => {
       // console.log(response.Set-Cookie)
        const token = this.tokenService.getTokenFromCookie();
        // const token = response.token; // Assurez-vous d'adapter cela à votre structure de réponse

        // Stocker le token dans le service d'authentification ou localement (localStorage)
        this.tokenService.set(token); // Assurez-vous d'avoir une méthode pour définir le token dans votre service d'authentification

        // Handle successful login response
        console.log(response);
        this.router.navigate(['/']);
      },
      error => {
        // Handle login error
        console.error(error);
      }
    );
  }

  logout() {
    // Supprimer le cookie JWT
    document.cookie = 'jwt=;expires=Thu, 01 Jan 1970 00:00:00 GMT';

    // Rediriger vers la page de connexion ou toute autre page souhaitée
    this.router.navigate(['/login']);
  }

  redirectToMdpOubliee() {
    this.router.navigate(['/mdp-oubliee']);
  }

 // login ():void {
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   const email = this.loginForm.get('email').value;
  //   const password = this.loginForm.get('password').value;
    
  //   this.seConnecterService.login(email, password).subscribe(
  //     response => {
  //      // console.log(response.Set-Cookie)
  //       const token = this.tokenService.getTokenFromCookie();
  //       // const token = response.token; // Assurez-vous d'adapter cela à votre structure de réponse

  //       // Stocker le token dans le service d'authentification ou localement (localStorage)
  //       this.tokenService.set(token); // Assurez-vous d'avoir une méthode pour définir le token dans votre service d'authentification

  //       // Handle successful login response
  //       console.log(response);
  //       this.router.navigate(['/']);
  //     },
  //     error => {
  //       // Handle login error
  //       console.error(error);
  //     }
  //   );
  // }
  // login(): void {
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  
  //   const email = this.loginForm.get('email').value;
  //   const password = this.loginForm.get('password').value;
  
  //   this.seConnecterService.login(email, password).subscribe(
  //     (response: any) => {
  //       // Récupérer le nom d'utilisateur depuis la réponse JSON
  //       const nom = response.nom;
  
  //       // Afficher le message "Bienvenue [nom_utilisateur]" dans l'interface utilisateur
  //       alert('Bienvenue ' + nom);
  
  //       // Autres actions à effectuer après une connexion réussie, par exemple, rediriger vers une autre page
  //       this.router.navigate(['/dashboard']);
  //     },
  //     (error) => {
  //       // Gérer les erreurs de connexion ici
  //       console.error(error);
  //       // Afficher un message d'erreur à l'utilisateur
  //       this.messageService.add({ severity: 'error', summary: 'Erreur de connexion', detail: 'Nom d\'utilisateur ou mot de passe incorrect' });
  //     }
  //   );
  // }
  


  // sendResetLink() {
  //   const email = this.loginForm.value.email; 
  
  //   if (email) {
      
  //     this.seConnecterService.sendResetLink(email).subscribe(
  //       () => {
         
  //         this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Lien de réinitialisation envoyé avec succès.' });
  //       },
  //       (error) => {
          
  //         console.error(error);
  //         this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur s\'est produite lors de l\'envoi du lien de réinitialisation.' });
  //       }
  //     );
  //   } else {
      
  //     this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez entrer un prenom valide.' });
  //   }
  // }
  
//   login() {
//     this.seConnecterService.login(this.loginForm.value).subscribe(
//       res => {
//         this.tokenStorage(res);
//       },
//       error => {
//         this.err = error.error;
//       },() => {
//         this.authenticationStateService.setAuthState(true);
//         this.loginForm.reset()
//         this.router.navigate(['/']);
//       }
//     );
// }

// tokenStorage(jwt){
//   this.tokenAuthService.setTokenStorage(jwt.access_token);
// }

  // login(){
  //   this.seConnecterService.login(this.login).subscribe(res: any)=>{
  //     this.data=res;
  //     this.status =res.status;
  //     if(this.status ==1){
  //       this.token =this.data.token;
  //       localStorage.setItem('token',this.token);
  //       this.router.navigate(['/']);

  //     }else{
  //       this.message =res.message
  //     }
  //   }
  // }





 
  // login() {
  //   if (this.loginForm.valid) {
  //     const email = this.loginForm.value.email;
  //     const password = this.loginForm.value.password;
      
  //     this.seConnecterService.login(email, password).subscribe(
  //       response => {
  //         console.log(response.message);
          
  //         this.router.navigate(['/dashboard']); 
  //       },
  //       error => {
  //         console.error(error);
          
  //       }
  //     );
  //   } else {
      
  //     console.log("Veuillez remplir tous les champs du formulaire.");
  //   }
  // }

  // submit(): void {
  //   this.http.post('http://localhost:8000/api/login',
  //    this.loginForm.getRawValue(), {
  //     withCredentials: true
  //   }).subscribe(() => this.router.navigate(['/']));
  // }



}





// sendResetLink() {
//   // Ajoutez la logique d'envoi de lien de réinitialisation ici
//   // Vérifiez si le formulaire est valide
//   if (this.loginForm.valid) {
//     // Récupérez l'email à partir du formulaire
//     const email = this.loginForm.value.email;
    
//     // Envoyez le lien de réinitialisation
//     // this.seConnecterService.sendResetLink(email).subscribe(...);

//     // Affichez un message de succès
//     this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Lien de réinitialisation envoyé avec succès.' });

//     // Réinitialisez le formulaire
//     this.loginForm.reset();
//   } else {
//     // Affichez un message d'erreur si le formulaire n'est pas valide
//     this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez entrer une adresse e-mail valide.' });
//   }
// }

// sendResetLink() {
//   if (this.forgotPasswordForm.valid) {
//     // Code pour envoyer le lien de réinitialisation du mot de passe
//     const email = this.forgotPasswordForm.value.email;
//     // Envoyer l'email à l'API pour le traitement
//     console.log('Envoyer un lien de réinitialisation à l\'adresse e-mail : ', email);
//     // Afficher un message de succès
//     this.messageService.add({severity:'success', summary:'Succès', detail:'Lien de réinitialisation envoyé avec succès.'});
//     // Réinitialiser le formulaire
//     this.forgotPasswordForm.reset();
//   } else {
//     // Afficher un message d'erreur si le formulaire est invalide
//     this.messageService.add({severity:'error', summary:'Erreur', detail:'Veuillez entrer une adresse e-mail valide.'});
//   }
// }






















// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
// import { Se_connecter } from 'src/app/shared/models/se_connecter';
// import { SeConnecterService } from 'src/app/shared/services/se-connecter.service';
// import { Router } from '@angular/router';

// import { MessageService, ConfirmationService } from 'primeng/api';
// @Component({
//   selector: 'app-se-connecter',
//   templateUrl: './se-connecter.component.html',
//   styleUrls: ['./se-connecter.component.scss'],
//   providers: [MessageService, ConfirmationService, SeConnecterService],
// })
// export class SeConnecterComponent implements OnInit {

//   dark: boolean;

//   checked: boolean;

//   loginForm!: FormGroup;
//   submitted = false;
//   errorLogin!: boolean;
  
//   nom: string;
//   mot_de_passe: string;
//   SeConnecterService: any;
//   // se_connecter: Se_connecter = new Se_connecter();
//   constructor(private formBuilder: FormBuilder, 
//     private seConnecterService: SeConnecterService,
//     private router: Router) {
//     this.loginForm = this.formBuilder.group({
//       nom: ['', Validators.required],
//       mot_de_passe: ['', Validators.required]
//     });
//   }
  
//   ngOnInit(): void {

//   }


//   login() {
//     this.SeConnecterService.login(this.nom, this.mot_de_passe).subscribe(
//       response => {
//         console.log(response.message);
//       },
//       error => {
//         console.error(error);
//       }
//     );
//   }
// }
//  onSubmit() {
//     this.submitted = true;
//     this.errorLogin = false;
//     console.log("connected", this.se_connecter);
//     this.seConnecterService.seConnecte(this.se_connecter).subscribe((data) => {
//       if (data == null) {
//         this.errorLogin = true;
//       }
//       else if (data != null) {
//         localStorage.setItem('USER', JSON.stringify(data));

//         alert('User connected successfully!');
//       }
//     });
//   }



// angForm: FormGroup;

// constructor(private fb: FormBuilder, 
//   private seConnecterService: SeConnecterService,
//   // private dataService: DataserviceService, 
//   private router: Router) {
//   this.angForm = this.fb.group({
//     nom: ['', [Validators.required, Validators.minLength(1)]],
//     prenom: ['', [Validators.required, Validators.minLength(1)]],
//     mot_de_passe: ['', Validators.required]
//   });
// 

