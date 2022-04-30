import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../classes/product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(productos: Product[], filterBy: String): Product[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase() : null;
    if (filter) {
      return productos
        .filter(product => product.nombre.toLocaleLowerCase().includes(filter))
    }
    return productos;
  }

}
