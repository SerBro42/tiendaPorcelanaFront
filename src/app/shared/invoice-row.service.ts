import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InvoiceRow } from '../classes/invoice-row';

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

    //Get invoice rows
    getInvoiceRows(): Observable<InvoiceRow[]> {
      return this.http.get<InvoiceRow[]>(environment.apiUrl+'/api/getInvoiceRows/');
    }

    //Get invoice rows
    getUserInvoiceRows(id: any): Observable<InvoiceRow[]> {
      return this.http.get<InvoiceRow[]>(environment.apiUrl+`/api/getUserInvoiceRows/${id}`);
    }
}
