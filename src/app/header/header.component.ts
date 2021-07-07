import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';
import { currentUserModel } from '../Model/model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  user: currentUserModel;

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.auth.currentUser.subscribe(currentUser => this.user = currentUser);
  }

  logout() {
    this.auth.logout();
  }

  login() {
    this.auth.loginGoogle();
  }

}
