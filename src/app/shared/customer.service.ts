import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  createCustomer(id_cliente: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUrl+'/api/cliente/add', id_cliente, {
      headers: headers
    });
  }

  // uploadData(data: any) {
  //   const headers = new HttpHeaders();
  //   return this.http.post(environment.apiUrl+'/api/product/', data, {
  //     headers: headers
  //   });
  // }
}
