import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { currentUserModel, User } from '../Model/model';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<currentUserModel>;
  public currentUser: Observable<currentUserModel>;
  private users: User[];
  user: currentUserModel;
  userData: User;
  userExist = false;

  constructor(
    private socialAuthService: SocialAuthService,
  ) {
    this.socialAuthService.authState.subscribe((user) => {
      this.setUser(user);
    });

    this.user = JSON.parse(localStorage.getItem("_ud"));
    this.users = JSON.parse(localStorage.getItem("users"));
    if (this.users === null) {
      this.users = [];
    }
    if (this.user === null) {
      this.currentUserSubject = new BehaviorSubject<currentUserModel>(null);
    } else {
      this.currentUserSubject = new BehaviorSubject<currentUserModel>(this.user);
    }
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUser.subscribe(data => this.user = data);
  }

  setUser(current: currentUserModel) {
    if (current === null) {
      return;
    }
    adduser: for (var i of this.users) {
      if (i.userId === current.id) {
        i.isFirsttime = false,
          this.userExist = true;
        localStorage.setItem("_ud", JSON.stringify(current));
        break adduser;
      }
    }

    if (this.userExist === false) {
      var user: currentUserModel = {
        id: current.id,
        email: current.email,
        name: current.name,
        photoUrl: current.photoUrl,
      }
      var userData: User = {
        userId: current.id,
        isFirsttime: true,
        userProduct: [],
      }
      this.users.push(userData);
      localStorage.setItem("users", JSON.stringify(this.users));
      localStorage.setItem("_ud", JSON.stringify(user));
    }
    this.currentUserSubject.next(current);
  }
  setData(data: User) {
    loop: for (var i = 0; i <= this.users.length; i++) {
      if (this.users[i].userId === data.userId) {
        this.users[i] = data;
        localStorage.setItem("users", JSON.stringify(this.users));
        break loop;
      }
    }
  }
  logout() {
    localStorage.removeItem('_ud');
    this.currentUserSubject.next(null);
    this.socialAuthService.signOut().then(x => console.log(x));
  }
  loginGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
