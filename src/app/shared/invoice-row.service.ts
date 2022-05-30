import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceRowService {

  constructor(private http: HttpClient) { }

  createInvoiceRow(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUrl+'/api/invoiceRow/add/', data, {
      headers: headers
    });
  }
}
