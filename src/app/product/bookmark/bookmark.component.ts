import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { currentUserModel, Product, User } from 'src/app/Model/model';
import { UserProductService } from 'src/app/service/user-product.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html'
})
export class BookmarkComponent {

  user: currentUserModel;
  userData: User;
  dislikeProduct: Product[];

  constructor(
    private auth: AuthenticationService,
    private userService: UserProductService
  ) {
    this.auth.currentUser.subscribe(currentUser => this.user = currentUser);
    this.userData = this.userService.get(this.user.id);
  }

  changeBookmark(id: any) {
    this.userData.userProduct[id - 1].isBookMarked = !this.userData.userProduct[id - 1].isBookMarked;
    this.auth.setData(this.userData);
  }

  changeLike(id: any) {
    this.userData.userProduct[id - 1].isDislike = !this.userData.userProduct[id - 1].isDislike;
    this.dislikeProduct = this.userData.userProduct.splice(id);
    this.userData.userProduct = this.userData.userProduct.concat(this.dislikeProduct);
    this.auth.setData(this.userData);
  }

}
