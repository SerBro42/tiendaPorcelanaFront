import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {

  constructor(private http: HttpClient) { }
  insertarFormulario(form:any): Observable<any>{
    return this.http.post(environment.apiUrl+'/api/contactForm/add',form);
  }

}
