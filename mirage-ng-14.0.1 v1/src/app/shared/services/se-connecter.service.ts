

import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SeConnecterService {
  private utilisateur: any;
  private url = environment.baseUrl + "";
  router: any;

  
    constructor(private httpClient: HttpClient,

    ) { }
  
   

    // login(email: string, password: string): Observable<any> {
    //   // Votre logique de connexion ici
    //   // Une fois que l'utilisateur est authentifié avec succès, vous pouvez stocker ses informations
    //   this.utilisateur = { email: email, /* autres informations de l'utilisateur */ };
    //   return this.httpClient.post(this.url + '/login', body,{headers: headers});
    // }

    login(email: string, password: string): Observable<any> {
      let headers = new HttpHeaders();
      headers.append('aertrt','123thyh')
      const body = {
        email: email,
        password: password
      };
      return this.httpClient.post(this.url + '/login', body,{headers: headers});
    }
    logout(): Observable<any> {
      // Votre logique de déconnexion ici
      // Par exemple, supprimez le jeton d'authentification, réinitialisez les informations de l'utilisateur, etc.
      this.utilisateur = null;
      return this.httpClient.post(this.url + '/logout', {});
    }
  
    getUtilisateur() {
      return this.utilisateur;
    }
    // logout(): Observable<any> {
     
    //   return this.httpClient.post(this.url + '/logout', {});
    // }
    sendEmail(email: string): Observable<any> {
        
        return this.httpClient.get<any>(this.url+'/send-email/'+ email);
      }

    // sendResetLink(email: string): Observable<any> {
    //   const url = `${this.url}/reset-password`; 
    
    //   return this.httpClient.post<any>(url, { email });
    // }
 


}












      
//     // login(email:string,password:string): Observable<any> {
//     //   return this.httpClient.post(this.url + '/login', {email:email,password:password});
//     // }


//  // login(data:any): Observable<any> {
//     //   return this.httpClient.post<any>(`${this.url}/login/`, data);
//     // }



//   // seconnecter(Se_connecter: Se_connecter): Observable<Se_connecter> {
//   //   return this.httpClient.post<Se_connecter>(environment.API_URL + "users/signin", JSON.stringify(Se_connecter), this.httpOptions)
//   //     .pipe(
//   //       catchError(this.errorHandler)
//   //     )
//   // }
//   // public getUtilisateurConnectee(): Se_connecter {
//   //   var currentUser = JSON.parse(localStorage.getItem("USER") as any)
//   //   return currentUser
//   // }


//   // public utilisateurconnecte(): boolean {
//   //   var user = JSON.parse(localStorage.getItem('User') as any);
//   //   if (user != null) {
//   //     return true;
//   //   }
//   //   return false;
//   // }
//   // errorHandler(error: any) {
//   //   let errorMessage = '';
//   //   if (error.error instanceof ErrorEvent) {
//   //     errorMessage = error.error.message;
//   //   } else {
//   //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//   //   }
//   //   return throwError(errorMessage);
//   // }





// //   redirectUrl: string;
 
 
// // @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();


// //   constructor(private httpClient : HttpClient) { }
// //   public userlogin(nom,prenom, mot_de_passe) {
// //     return this.httpClient.post<any>(this.url + '/login.php', { nom,prenom, mot_de_passe })
// //         .pipe(map(Usermodule => {
// //             this.setToken(Usermodule[0].name);
// //             this.getLoggedInName.emit(true);
// //             return Usermodule;
// //         }));
// // }

// // //token
// // setToken(token: string) {
// //   localStorage.setItem('token', token);
// // }
 
// // getToken() {
// //   return localStorage.getItem('token');
// // }
 
// // deleteToken() {
// //   localStorage.removeItem('token');
// // }
 
// // isLoggedIn() {
// //   const usertoken = this.getToken();
// //   if (usertoken != null) {
// //     return true
// //   }
// //   return false;
// // }
 
// }

