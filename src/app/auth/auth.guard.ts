import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { currentUserModel } from '../Model/model';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  currentUser: currentUserModel;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // logged in so return true
    if (this.currentUser) {
      return true;
    }

    if (state.url.includes('login')) {
      return;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } }); // skipLocationChange: true,
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
