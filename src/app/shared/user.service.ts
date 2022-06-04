import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //Change user data
  editUser(id: any, data: any) {
    const headers = new HttpHeaders();
    return this.http.patch(environment.apiUrl+`/api/user/edit/${id}`, data, {
      headers: headers
    });
  }

  //Change user role to Administrator
  promoteToAdmin(id: any) {
    const headers = new HttpHeaders();
    return this.http.patch(environment.apiUrl+`/api/user/promoteToAdmin/${id}`, {
      headers: headers
    });
  }

  //Get users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl+'/api/getUsers/');
  }

}
