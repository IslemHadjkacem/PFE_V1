
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Utilisateur } from '../models/utilisateur';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private utilisateur: any;
  constructor(private httpClient: HttpClient,
    
    
    ) {}
  
  private url = environment.baseUrl + "/utilisateur";
  
  getUserInfo() {
    return this.httpClient.get<any>(this.url +'/user'); // Remplacez '/api/userinfo' par l'URL de votre endpoint API Laravel
  }

  setUtilisateur(utilisateur: any) {
    this.utilisateur = utilisateur;
  }
 
  getUtilisateur() {
    return this.utilisateur;
  }

  getUtilisateurById(id: any): Observable<any> {
    return this.httpClient.get(this.url + '/getById/' + id);
  }
 
addUtilisateur(data: Utilisateur ): Observable<any> {
  return this.httpClient.post(this.url + '/add', data).pipe(
      catchError(error => {
          console.error('Error in addutilisateur:', error);
          throw error;
      })
  );
}
updateUtilisateur(id: any, data: Utilisateur): Observable<any> {
  return this.httpClient.put(this.url + '/update_utilisateur/' + id, data);


}

getUtilisateurs() {
  return this.httpClient.get(this.url + '/getAll');
}

deleteData(id: any): Observable<any> {
  return this.httpClient.delete(this.url + '/delete/' + id).pipe(
    catchError((error) => {
      console.error('Error in deleteData:', error);
      throw error;
    })
  );
}


insertData(data: Utilisateur) {
  return this.httpClient.post(this.url + '/add', data);
}

updateData(id: any, data: Utilisateur): Observable<any> {
  return this.httpClient.put(this.url + '/update/' + id, data);
}
login(data: any) {
  return this.httpClient.post(this.url + '/login', data);
}

public registerUtilisateur(nom: string, prenom: string, mot_de_passe: string): Observable<any> {
  return this.httpClient.post<any>(this.url + '/register', { nom, prenom, mot_de_passe });
}

sendPasswordResetLink(data: any) {
  return this.httpClient.post( this.url + '/sendPasswordResetLink', data);
}
updatePass(id: any, data: Utilisateur) {
  return this.httpClient.put(
    this.url+'/updatePass/' + id, data);
}

logout(): Observable<any> {
  const apiUrl = 'http://127.0.0.1:8000/api';
  const logoutUrl = `${apiUrl}/logout`;

  return this.httpClient.post(logoutUrl, {});
}


}