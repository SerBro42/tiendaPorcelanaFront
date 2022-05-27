import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/shared/auth-state.service';
import { CartService } from 'src/app/shared/cart.service';
import { TokenService } from 'src/app/shared/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSignedIn!: boolean;
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    private cartService: CartService,
  ) {}
  ngOnInit(): void {
      this.auth.userAuthState.subscribe((val) => {
        this.isSignedIn = val;
      });
  }

  //Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.cartService.removeCartToken();
    this.router.navigate(['login']);
  }
}
