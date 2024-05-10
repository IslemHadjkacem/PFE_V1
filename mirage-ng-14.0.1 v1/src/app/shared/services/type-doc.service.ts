import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeDoc } from '../models/typeDocument.model';

@Injectable({
  providedIn: 'root'
})
export class TypeDocService {
 
  private url = environment.baseUrl + "/type_document";

  constructor(private httpClient: HttpClient) { }

  getType_documentById(id: any): Observable<any> {
    return this.httpClient.get(this.url + '/getById/' + id);
  }
  deleteSelectedTypeDocuments(ids: number[]): Observable<any> {
    return this.httpClient.post<any>(this.url, { ids });
  }
addTypeDocument(data: TypeDoc ): Observable<any> {
  return this.httpClient.post(this.url + '/add', data).pipe(
      catchError(error => {
          console.error('Error in addTypeDocument:', error);
          throw error;
      })
  );
}
updateType_document(id: any, data: TypeDoc): Observable<any> {
  return this.httpClient.put(this.url + '/update/' + id, data);


}
  getType_documents(): Observable<any> {
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


  insertData(data: TypeDoc) {
    return this.httpClient.post(this.url + '/add', data);
  }

  updateData(id: any, data: TypeDoc): Observable<any> {
    return this.httpClient.put(this.url + '/update/' + id, data);
  }
  
  // Implémentation manquante pour la méthode getEtatById
  // getEtatById(id: any): Observable<any> {
  //   return this.httpClient.get(this.url + '/getEtatById/' + id);
  // }
}





