import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../classes/product';
import { ProductsService } from '../shared/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<any> {

  constructor(private productsService: ProductsService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('Called Get products in resolver...', route);
    const id = +route.params['id'];
    return this.productsService.getProducto(id).pipe(
      catchError(() => {
        this.router.navigate(['/products']);
        return of();
      })
    );
    throw new Error('Method not implemented.');
  }
}
