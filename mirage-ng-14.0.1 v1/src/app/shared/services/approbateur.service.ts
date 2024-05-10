import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Approbateur } from '../models/approbateur';

@Injectable({
  providedIn: 'root'
})
export class ApprobateurService {
 
  http: any;
  url=environment.baseUrl+"/approbateur"
  constructor(private httpClient: HttpClient) { }
 

  // getUtilisateurNiveau(): Observable<any[]> {
  //   return this.httpClient.get<any[]>(`${this.url}/utilisateurNiveau`);
  // }
  getAllApprobateurs() {
    return this.httpClient.get<any>(`${this.url}/api/getAllApprobateurs`);
  }

  updateApprobateurs(idNiveau: any, approbateurs: any[]): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/update/${idNiveau}`, { approbateurs })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de la mise à jour des approbateurs :', error);
          throw error;
        })
      );
  }

getApprobateurs(idNiveau: any): Observable<any> {
  return this.httpClient.get(`${this.url}/getAll/${idNiveau}`);
}
getApprobateurById(id: number): Observable<any> {
  return this.httpClient.get(`${this.url}/approbateur/${id}`);
}
  deleteData(id: any): Observable<any> {
    return this.httpClient.delete(this.url + '/delete/' + id).pipe(
      catchError((error) => {
        console.error('Erreur dans deleteData:', error);
        throw error;
      })
    );
  }
 

  addApprobateur(data: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/add', data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'ajout de l\'approbateur :', error);
          throw error;
        })
      );
  }
  
  getData(): Observable<any> {
    return this.httpClient.get(this.url+'/getAll/');
  }
  insertData(data:Approbateur){
    return this.httpClient.post(this.url+'/add',data);
  }
  deletetData(id:any){
    return this.httpClient.delete(this.url+'/delete/'+id);
  }
  
}

 