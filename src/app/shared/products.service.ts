import { Injectable } from '@angular/core';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProductos(): Product[] {
    return[{
      nombre: 'Meissen Berlin - Coffee set',
      cod_prod: '',
      id_cat: '',
      descripcion: 'Meissen porcelain coffee set from the "Berlin" collection. Complete set including 2x cup & saucer, coffee pot, creamer, sugar bowl.',
      imagen: 'assets/Berlin_1.jpg',
    }, {
      nombre: 'Meissen Berlin - Coffee cup & saucer',
      cod_prod: '',
      id_cat: '',
      descripcion: 'Meissen porcelain coffee set from the "Berlin" collection. Includes 2x cup & saucer.',
      imagen: 'assets/Berlin_2.jpg',
    }, {
      nombre: 'Meissen Paris - Coffee cup & saucer',
      cod_prod: '',
      id_cat: '',
      descripcion: "Meissen porcelain coffee set from the 'Paris' collection. Includes a cup and saucer.",
      imagen: 'assets/Paris_1.jpg',
    }, {
      nombre: 'Bordallo Pinheiro - Cabbage dish',
      cod_prod: '',
      id_cat: '',
      descripcion: 'Bordallo Pinheiro Faianças Artísticas. Cabbage green large bowl.',
      imagen: 'assets/bordallo.jpg',
    }, {
      nombre: 'Bordallo Pinheiro - Prato Museu',
      cod_prod: '',
      id_cat: '',
      descripcion: 'Bordallo Pinheiro Faianças Artísticas. Lobster in a basket-shaped bowl.',
      imagen: 'assets/prato_museu.jpg',
    }, {
      nombre: 'Robbe & Berking Belvedere',
      cod_prod: '',
      id_cat: '',
      descripcion: 'Robbe & Berking silver tableware. Belvedere collection.',
      imagen: 'assets/belvedere.jpg',
    }];
  }
}
