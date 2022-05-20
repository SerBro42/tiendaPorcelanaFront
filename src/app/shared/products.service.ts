import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  uploadData(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUrl+'/api/product/', data, {
      headers: headers
    });
  }

  getProductos(): Product[] {
    return[{
      id: 1,
      nombre: 'Meissen Berlin - Coffee set',
      cod_prod: '',
      id_cat: '',
      descripcion: 'Meissen porcelain coffee set from the "Berlin" collection. Complete set including 2x cup & saucer, coffee pot, creamer, sugar bowl.',
      imagen: 'assets/Berlin_1.jpg',
      precio: 70.60
    }, {
      id: 2,
      nombre: 'Meissen Berlin - Coffee cup & saucer',
      cod_prod: '',
      id_cat: '',
      descripcion: 'Meissen porcelain coffee set from the "Berlin" collection. Includes 2x cup & saucer.',
      imagen: 'assets/Berlin_2.jpg',
      precio: 70.60
    }, {
      id: 3,
      nombre: 'Meissen Paris - Coffee cup & saucer',
      cod_prod: '',
      id_cat: '',
      descripcion: "Meissen porcelain coffee set from the 'Paris' collection. Includes a cup and saucer.",
      imagen: 'assets/Paris_1.jpg',
      precio: 70.60
    }, {
      id: 4,
      nombre: 'Bordallo Pinheiro - Cabbage dish',
      cod_prod: '',
      id_cat: '',
      descripcion: 'Bordallo Pinheiro Faianças Artísticas. Cabbage green large bowl.',
      imagen: 'assets/bordallo.jpg',
      precio: 70.60
    }, {
      id: 5,
      nombre: 'Bordallo Pinheiro - Prato Museu',
      cod_prod: '',
      id_cat: '',
      descripcion: 'Bordallo Pinheiro Faianças Artísticas. Lobster in a basket-shaped bowl.',
      imagen: 'assets/prato_museu.jpg',
      precio: 70.60
    }, {
      id: 6,
      nombre: 'Robbe & Berking Belvedere',
      cod_prod: '',
      id_cat: '',
      descripcion: 'Robbe & Berking silver tableware. Belvedere collection.',
      imagen: 'assets/belvedere.jpg',
      precio: 70.60
    }];
  }

  getProductosHTTP():Observable<Product[]>{
    return this.http.get<Product[]>(environment.apiUrl+'/api/showProducts/');
  }

  getProducto(id: number): Observable<Product>{
    return this.http.get<Product>(environment.apiUrl+`/api/products/${id}`).pipe(map(resp => resp));
  }
}
