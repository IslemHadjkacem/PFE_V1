import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Etat } from '../models/etat.model';
@Injectable({
  providedIn: 'root'
})
export class EtatService {
 

  http: any;
  url=environment.baseUrl+"/etat"
  constructor(private httpClient: HttpClient) { }
  getEtatById(id_niveau: number): Observable<any> {
    return this.httpClient.get(`${this.url}/etat/${id_niveau}`);
}


updateEtat(id: any, data: Etat): Observable<any> {
  return this.httpClient.put(this.url + '/update_etat/' + id, data);
}

getEtatByClassedoc(classedocId: any): Observable<any> {
  const url = this.url+"/getEtatByClassedoc/"+classedocId;
  return this.httpClient.get(url);
}
  deleteData(id: any): Observable<any> {


    return this.httpClient.delete(this.url + '/delete/' + id).pipe(
      catchError((error) => {
        console.error('Error in deleteData:', error);
        throw error;
      })
    );
  }
  addEtat(etat: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/add', etat)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error in etat:', error);
          throw error;
        })
      );
  }
  
  getData():  Observable<any> {
    return this.httpClient.get(this.url+'/getAll');
  }
  insertData(data:Etat){
    return this.httpClient.post(this.url+'/add',data);
  }
  deletetData(id:any){
    return this.httpClient.delete(this.url+'/delete/'+id);
  }
  
}
