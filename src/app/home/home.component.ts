import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { currentUserModel, Product, User } from '../Model/model';
import { UserProductService } from '../service/user-product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  user: currentUserModel;
  userData: User;
  dislikeProduct: Product[];
  constructor(
    private auth: AuthenticationService,
    private userservice: UserProductService,
    private router: Router
  ) {
    this.auth.currentUser.subscribe(currentUser => {
      this.user = currentUser;
      if (this.user !== null) {
        this.userData = this.userservice.get(this.user.id);
        if (this.userData.isFirsttime === undefined || this.userData.isFirsttime === true) {
          this.router.navigate(['/add']);
        }
      }
    });

  }

  login() {
    this.auth.loginGoogle();
  }

}
