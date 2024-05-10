import { Injectable } from '@angular/core';
import { Workflow } from '../models/workflows';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WorkflowsService {
  http: any;
  url=environment.baseUrl+"/formulaires"
  constructor(private httpClient: HttpClient) { }


  getWorkflows(): Observable<Workflow[]> {
    return this.httpClient.get<Workflow[]>(this.url+'/show');
  }
}

  // Ajoutez les autres méthodes CRUD selon vos besoins
