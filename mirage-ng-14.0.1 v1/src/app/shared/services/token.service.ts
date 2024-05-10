import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  // getTokenFromCookie() {
  //   const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt='));
  //   if (tokenCookie) {
  //     return tokenCookie.split('=')[1];
  //   }
  //   return null;
  // }
// getTokenFromCookie() {
//   const tokenCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt='));
//   console.log(document.cookie)
//   console.log(tokenCookie)
//   if (tokenCookie) {
//     return tokenCookie.split('=')[1].trim(); // Ajoutez .trim() pour supprimer les espaces éventuels autour du token
//   }
//   return null;
// }





getTokenFromCookie() {
  // Obtenez la chaîne de cookies et supprimez les espaces au début et à la fin
  const allCookies = document.cookie.trim();
  console.log('All cookies:', allCookies);

  // Recherchez le cookie JWT dans la chaîne de cookies
  const tokenCookie = allCookies.split(';').find(cookie => cookie.trim().startsWith('jwt='));
  console.log('Token cookie:', tokenCookie);

  if (tokenCookie) {
    // Récupérez la valeur du cookie JWT et supprimez les espaces au début et à la fin
    const tokenValue = tokenCookie.split('=')[1].trim();
    console.log('Token value:', tokenValue);
    return tokenValue;
  }
  return null;
}



set(token: string) {
  const encodedToken = encodeURIComponent(token);
  document.cookie = `jwt=${encodedToken}`;
}

  remove(){
    document.cookie = 'jwt=;expires=Teu, 01 Jan 1970 00:00:00 GMT';
  }

  handle(token: any){
    this.set(token);
  }

  // set(token: any){
  //   localStorage.setItem('token', token);
  // }

  get(){
    return localStorage.getItem('token');
  }

  // remove(){
  //   localStorage.removeItem('token');
  // }

  isValid(){
    const token = this.get();
    if(token){
      const payload = this.payload(token);
      if(payload){
        return (payload.iss === "http://127.0.0.1:8000/api/login") ? true : false;
      }
    }
    return false;
  }

  getRole() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return payload.admin;
      }
    }
    return null;
  }

  private payload(token: any){
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  loggedIn(){
    return this.isValid();
  }
}
