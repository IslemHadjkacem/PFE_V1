import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Niveau } from '../models/niveau.model';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  private url = environment.baseUrl + "/niveau";

  constructor(private httpClient: HttpClient) { }

  getNiveauByClassedoc(classedocId: any): Observable<any> {
    const url = this.url+"/getNiveauByClassedoc/"+classedocId;
    return this.httpClient.get(url);
  }

  getNiveauById(id: any): Observable<Niveau> {
    return this.httpClient.get<Niveau>(this.httpClient + '/getById/' + id);
  }

  getNiveaux(): Observable<any> {
    return this.httpClient.get(this.url + '/getAll');
  }
  
  // getData() {
  //   return this.httpClient.get(this.url + '/getAll');
  // }

  insertData(data: Niveau): Observable<any> {
    return this.httpClient.post(this.url + '/add', data);
  }


  addNiveau(niveau: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/add', niveau)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error in addNiveau:', error);
          throw error;
        })
      );
  }

  updateNiveau(id: any, data: Niveau): Observable<any> {
    return this.httpClient.put(this.url + '/update_niveau/' + id, data);
  }
  deleteData(id: any): Observable<any> {
    return this.httpClient.delete(this.url + '/delete/' + id).pipe(
      catchError((error) => {
        console.error('Error in deleteData:', error);
        throw error;
      })
    );
  }

  getNomTypeDoc(idTypeDoc: number): Observable<any> {
    return this.httpClient.get<any>(`${this.url}/getNom_Type_Doc/${idTypeDoc}`);
  }
}





























