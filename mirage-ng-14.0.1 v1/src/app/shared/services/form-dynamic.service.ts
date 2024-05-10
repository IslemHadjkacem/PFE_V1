import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Formulaire } from '../models/formulaires';

@Injectable({
  providedIn: 'root'
})
export class FormDynamicService {

  http: any;
  url=environment.baseUrl+"/formulaires"
  constructor(private httpClient: HttpClient) { }

  // insertData(data: Formulaire): Observable<any> {
  //   return this.httpClient.post(this.url + '/add', data);
  // }

  // addFormulaire(formdata: any): Observable<any> {
  //   // Ajoutez l'id du type de document aux données du formulaire
  //   formdata.id = 1; // ID du type de document
  //   return this.httpClient.post<any>(this.url + '/add', formdata)
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         console.error('Error in addFormulaire:', error);
  //         throw error;
  //       })
  //     );
  // }
  // addFormulaire(formdata: any): Observable<any> {
  //   return this.httpClient.post<any>(this.url + '/add' , formdata)
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         console.error('Error in addFormulaire:', error);
  //         throw error;
  //       })
  //     );
  // }
  // updateFormulaire(formulaire: any): Observable<any> {
  //   return this.httpClient.put<any>(this.url + '/update/' + formulaire.id, formulaire)
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         console.error('Error in updateFormulaire:', error);
  //         throw error;
  //       })
  //     );
  // }
  // updateformualire(id: any, formdata: Formulaire): Observable<any> {
  //   return this.httpClient.put(this.url + '/update_form/' + id, formdata);
  // }
    getFormSchema(formId: string): Observable<any> {
      // Faites une requête HTTP pour récupérer le schéma du formulaire correspondant à l'ID
      return this.httpClient.get<any>(this.url+'/getSchema/'+formId).pipe(
        // catchError(this.handleError)
      );
    }
    getFormulaires(): Observable<any> {
      return this.httpClient.get<any>(this.url+'/getAll').pipe(
        // catchError(this.handleError)
      );
    }
    // saveFormData(formdata: any): Observable<any> {
    //   // Envoyez les données du formulaire au backend pour sauvegarde
    //   return this.httpClient.post<any>(this.url,'/save'+formdata);
    // }
  // // Ajouter les données du formulaire
  // addFormData(formData: any): Observable<any> {
  //   return this.httpClient.post<any>(this.url, formData).pipe(
  //     // catchError(this.handleError)
  //   );
  // }

  // // Modifier les données du formulaire
  // editFormData(formId: string, formData: any): Observable<any> {
  //   return this.httpClient.put<any>(`${this.url}/${formId}`, formData).pipe(
  //     // catchError(this.handleError)
  //   );
  // }
    // submitFormData(formId: string, formData: any): Observable<any> {
    //   return this.httpClient.post<any>(`${this.url}/${formId}`, formData);
    // }
  
   
  // getFormSchema(formId: string): Observable<any> {
  //   // Faites une requête HTTP pour récupérer le schéma du formulaire correspondant à l'ID
  //   return this.httpClient.get<any>(this.url+'/getById/' +formId);
   
  // }
  // getFormulaires(): Observable<any> {
  //   return this.httpClient.get(this.url + '/getAll');
  // }
    // private handleError(error: HttpErrorResponse) {
    //   let errorMessage = 'An error occurred while fetching form schema.';
    //   if (error.error instanceof ErrorEvent) {
    //     // Erreur côté client
    //     errorMessage = Error: ${error.error.message};
    //   } else {
    //     // Erreur côté serveur
    //     errorMessage = Server Error: ${error.status} - ${error.error.message};
    //   }
    //   console.error(errorMessage);
    //   return throwError(errorMessage);
    // }



  

  // private handleError(error: HttpErrorResponse) {
  //   let errorMessage = 'An error occurred while fetching form schema.';
  //   if (error.error instanceof ErrorEvent) {
  //     // Erreur côté client
  //     errorMessage = 'Error: ${error.error.message}';
  //   } else {
  //     // Erreur côté serveur
  //     errorMessage = 'Server Error: ${error.status} - ${error.error.message}';
  //   }
  //   console.error(errorMessage);
  //   return throwError(errorMessage);
  // }
}
  
