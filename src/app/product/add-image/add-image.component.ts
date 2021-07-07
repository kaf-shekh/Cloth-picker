import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { currentUserModel, Product, User } from 'src/app/Model/model';
import { UserProductService } from 'src/app/service/user-product.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html'
})
export class AddImageComponent implements OnInit, OnDestroy {

  showProduct: Product;
  Products: Product[] = [];
  imageNumber = 1;
  error: string;
  submitted: boolean;
  user: currentUserModel;
  userData: User;
  constructor(private auth: AuthenticationService,
    private userService: UserProductService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(data => { this.user = data; })
    this.userData = this.userService.get(this.user.id);
  }
  handleFileInput(evt: any) {
    this.error = '';
    var imagesObject: Product[] = [];
    var imgnumber = this.imageNumber;
    var ProductID: number;
    if (this.imageNumber <= 2) {
      imagesObject = this.userData.userProduct;
      if (this.imageNumber === 1 && imagesObject !== null) {
        ProductID = imagesObject.length + 1;
      } else if (this.imageNumber === 1 && imagesObject.length === 0) {
        imagesObject[0].ProductId = 1;
        ProductID = 1;
      } else if (this.imageNumber === 2 && imagesObject.length !== 0) {
        ProductID = imagesObject.length;
      }

      var files = evt.target.files; // FileList object
      // Loop through the FileList and render image files as thumbnails.
      for (var i = 0, f; f = files[i]; i++) {
        // Only process image files.
        if (!f.type.match('image.*')) {
          continue;
        }
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = function (e: any) {
          addImage(e.target.result);
        };
        reader.readAsDataURL(f);
      }
      const addImage = (imgData: any) => {
        if (imgnumber === 1) {
          var shirtimg = imgData;
          imagesObject.push({
            ProductId: ProductID,
            shirtimg: shirtimg,
            pantimg: '',
            isBookMarked: false,
            isDislike: false
          })
        } else {
          loop: for (var i of imagesObject) {
            if (i.ProductId === ProductID) {
              i.pantimg = imgData;
              break loop;
            }
          }
        }
        this.Products = imagesObject;
        imagesObject = [];
        this.setData(this.Products);
      }
      this.imageNumber++;
    } else {
      this.error = 'Can not add more than Two images in one pair.';
      return;
    }


  }
  setData(productData: any) {
    if(this.userData.isFirsttime){
      this.userData.isFirsttime = false;
    }
    this.userData.userProduct = productData;
    this.loadFromLocalStorage();
    this.auth.setData(this.userData);
  }

  saveImages() {
    if (this.showProduct !== undefined) {
      if (this.showProduct.pantimg === '' || this.showProduct.pantimg === undefined) {
        this.error = 'Please Select One more Cloth for making pair';
        this.submitted = true;
        return;
      }
      this.router.navigate(['/']);
    }
  }
  cancel() {
    if (this.showProduct !== undefined) {
      if (this.showProduct.pantimg === '') {
        this.popData();
      }
    }
    this.router.navigate(['/']);
  }

  loadFromLocalStorage() {
    var lastElement = this.userData.userProduct.length;
    this.showProduct = this.userData.userProduct[lastElement - 1];
  }
  ngOnDestroy() {
    if (!this.submitted && this.showProduct !== undefined) {
      if (this.showProduct.pantimg === '') {
        this.popData();
      }
    }
  }
  popData() {
    this.userData.userProduct.pop();
    this.auth.setData(this.userData);
  }
}



