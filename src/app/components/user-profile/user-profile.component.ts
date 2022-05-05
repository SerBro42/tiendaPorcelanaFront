import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/classes/user';
import { Role } from 'src/app/classes/role';
import { RolesService } from 'src/app/shared/roles.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  UserProfile!: User;
  userRoles: Role[] = [];


  constructor(
    public roleService: RolesService,
    public authService: AuthService
    ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
    });
  }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(res => {
      this.userRoles = res;
    });
  }

  getRoleName(id: any) {
    let role = this.userRoles.filter(function(item) {return item.id_rol === id})[0];
    return role.nombre_rol;
  }

}
