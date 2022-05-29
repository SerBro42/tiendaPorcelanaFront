//Atributos de la tabla 'lineas_de_pedido': id, id_pedido, cantidad, id_prod
//Atributos de la tabla 'pedidos': id_pedido, id_cliente, fecha
//Atributos de la tabla 'productos': id, nombre, descripcion, cod_prod, id_cat, imagen, precio
export class CartItem {
  id: any; //tabla linea de pedido
  id_prod: any; //tabla linea de pedido, referencia tabla productos
  //nombre_prod: any; //tabla productos
  cantidad: any; //tabla linea de pedido
  precio: any;  //tabla productos

}
