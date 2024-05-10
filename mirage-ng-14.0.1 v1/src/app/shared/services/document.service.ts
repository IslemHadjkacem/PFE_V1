import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Document } from '../models/document';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private url = environment.baseUrl + "/document";

  constructor(private httpClient: HttpClient) { }

  getTypeByClassedoc(classedocId: any): Observable<any> {
    const url = this.url+"/getTypeByClassedoc/"+classedocId;
    return this.httpClient.get(url);
  }
  getutilisateur(utilisateur: any): Observable<any> {
    return this.httpClient.get(this.url+'/getutilisateur/'+utilisateur);
  }
  save(formdata: any,typeDOc:string): Observable<any>  {
    return this.httpClient.post(this.url+'/add/'+ typeDOc, formdata);
  }
  // save(formdata: any,typeDOc:string,utilisateur?: string): Observable<any>  {
  //   return this.httpClient.post(this.url+'/add/'+ typeDOc + '/' + utilisateur, formdata);
  // }
  update(idDocument: number, formdata: any) {
    return this.httpClient.put(this.url+'/update/'+idDocument, formdata);
  }

  getdocumentById(id: any): Observable<Document> {
    return this.httpClient.get<Document>(this.httpClient + '/getById/' + id);
  }

getUtilisateurById(id: any): Observable<any> {
  return this.httpClient.get(this.url + '/getById/' + id);
}
  getdocuments(): Observable<any> {
    return this.httpClient.get(this.url + '/getAll');
  }
  
 

  insertData(data: Document): Observable<any> {
    return this.httpClient.post(this.url + '/add', data);
  }
  deleteData(idDocument: any): Observable<any> {
    return this.httpClient.delete(this.url + '/delete/' + idDocument).pipe(
      catchError((error) => {
        console.error('Error in deleteData:', error);
        throw error;
      })
    );
  }

  // constructor() { }
}

  // adddocument(document: any): Observable<any> {
  //   return this.httpClient.post<any>(this.url + '/add', document)
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         console.error('Error in adddocument:', error);
  //         throw error;
  //       })
  //     );
  // }
  // updateformulaire(id: any, data: Formulaire): Observable<any> {
  //   return this.httpClient.put(this.url + '/update_formulaire/' + id, data);
  // }

  //   saveFormData(formData: any): Observable<any> {
  //   // Envoyez les données du formulaire au backend pour sauvegarde
  //   return this.httpClient.post<any>(this.url+'/save', formData);
  // }
  
  // getutilisateur(utilisateur: any): Observable<any> {
  //   return this.httpClient.get(`${this.url}/getutilisateur/${utilisateur}`);
  // }


  //   getutilisateur(utilisateurId: any): Observable<any> {
//   return this.httpClient.get(`${this.url}/getUtilisateurById/${utilisateurId}`);
// }
// getUtilisateurById(id: any): Observable<any> {
//   const url =(this.url+'/getUtilisateurById/'+id);
//   return this.httpClient.get(url);
// }
