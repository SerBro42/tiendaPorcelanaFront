import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../classes/categoria';

@Injectable({
  providedIn: 'root'
})
export class ProductCatService {

  constructor(private http: HttpClient) { }

  public dropDownShow(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(environment.apiUrl+'/api/dropDownShow/');
  }

}
