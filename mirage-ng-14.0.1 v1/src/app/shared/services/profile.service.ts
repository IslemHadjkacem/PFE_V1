import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private url = environment.baseUrl + "/profile";

  constructor(private httpClient: HttpClient) { }
  getProfile(email: string) {
    return this.httpClient.get<any>(this.httpClient +'/profile/'+email);
  }
 
}
