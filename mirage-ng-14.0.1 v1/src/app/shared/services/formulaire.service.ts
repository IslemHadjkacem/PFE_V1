import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Formulaire } from '../models/formulaires';
@Injectable({
  providedIn: 'root'
})
export class FormulaireService {
  

  private url = environment.baseUrl + "/formulaire";

  constructor(private httpClient: HttpClient) { }

  getTypeByClassedoc(classedocId: any): Observable<any> {
    const url = this.url+"/getTypeByClassedoc/"+classedocId;
    return this.httpClient.get(url);
  }

  getformulaireById(id: any): Observable<Formulaire> {
    return this.httpClient.get<Formulaire>(this.httpClient + '/getById/' + id);
  }

  getformulaires(): Observable<any> {
    return this.httpClient.get(this.url + '/getAll');
  }
  
 

  insertData(data: Formulaire): Observable<any> {
    return this.httpClient.post(this.url + '/add', data);
  }


  addformulaire(formulaire: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/add', formulaire)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error in addformulaire:', error);
          throw error;
        })
      );
  }
  // updateformulaire(id: any, data: Formulaire): Observable<any> {
  //   return this.httpClient.put(this.url + '/update_formulaire/' + id, data);
  // }
  deleteData(id: any): Observable<any> {
    return this.httpClient.delete(this.url + '/delete/' + id).pipe(
      catchError((error) => {
        console.error('Error in deleteData:', error);
        throw error;
      })
    );
  }

  // getNomTypeDoc(idTypeDoc: number): Observable<any> {
  //   return this.httpClient.get<any>(`${this.url}/getNom_Type_Doc/${idTypeDoc}`);
  // }

 
}
