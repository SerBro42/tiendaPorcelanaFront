import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../classes/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(id_cliente: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUrl+'/api/order/add', id_cliente, {
      headers: headers
    });
  }

  getLatestOrder(): Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/api/order/latest');
  }
}
