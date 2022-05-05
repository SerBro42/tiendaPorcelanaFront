import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role } from '../classes/role';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getRoles():Observable<Role[]>{
    return this.http.get<Role[]>(environment.apiUrl+'/api/getRoles/');
  }
}
