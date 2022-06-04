import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/classes/user';
import { Role } from 'src/app/classes/role';
import { RolesService } from 'src/app/shared/roles.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/shared/user.service';
import { InvoiceRow } from 'src/app/classes/invoice-row';
import { InvoiceRowService } from 'src/app/shared/invoice-row.service';
import { Product } from 'src/app/classes/product';
import { ProductsService } from 'src/app/shared/products.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  UserProfile!: User;
  userRoles: Role[] = [];
  productsList: Product[] = [];
  allUsers: User[] = [];
  allInvoiceRows: InvoiceRow[] = [];

  displayedColumns: string[] = ['name', 'email', 'address', 'created_at', 'id_role', 'promote'];
  displayedColumns2: string[] = ['id_pedido', 'cantidad', 'id_prod', 'precio', 'created_at'];
  //placeholder data for experimentation (dataSource)
  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  //actual data (dataSource2)
  dataSource2: any;
  dataSource3: any;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('sort2') sort2!: MatSort;

  constructor(
    public roleService: RolesService,
    public authService: AuthService,
    public userService: UserService,
    public invoiceRowService: InvoiceRowService,
    public productsService: ProductsService,
    ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
    });
  }

  ngOnInit() {
    this.roleService.getRoles().subscribe(res => {
      this.userRoles = res;
    });
    this.productsService.getProductosHTTP().subscribe(res => {
      this.productsList = res;
    })
    this.userService.getUsers().subscribe(res => {
      this.allUsers = res;
    });
    this.invoiceRowService.getInvoiceRows().subscribe(res => {
      this.allInvoiceRows = res;
    });
    /* Las siguientes líneas no se cargan si se ponen en ngOnInit. Deben ir en ngAfterViewInit */
    //this.dataSource.paginator = this.paginator;
    //setTimeout(() => this.dataSource.paginator = this.paginator);
    //this.dataSource.sort = this.sort;
    //setTimeout(() => this.dataSource.sort = this.sort);
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    //dataSourceX must be assigned a value in ngAfterViewInit, otherwise, it's empty
    this.dataSource2 = new MatTableDataSource(this.allUsers);
    this.dataSource2.paginator = this.paginator1;
    this.dataSource2.sort = this.sort1;

    this.dataSource3 = new MatTableDataSource(this.allInvoiceRows);
    this.dataSource3.paginator = this.paginator2;
    this.dataSource3.sort = this.sort2;
  }

  getRoleName(id: any) {
    let role = this.userRoles.filter(function(item) {return item.id_rol === id})[0];
    return role.nombre_rol;
  }

  getProductName(id: any) {
    let prodName = this.productsList.filter(function(item) {return item.id === id})[0];
    return prodName.nombre;
  }

  promoteToAdmin(id: any) {
    this.userService.promoteToAdmin(id).subscribe(res => {
      console.log(res);
      window.location.reload();
    });
    console.log('User promoted: ',id);
  }

}

/* Static data */
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];
