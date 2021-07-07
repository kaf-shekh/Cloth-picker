export class Product {
  ProductId: number | string;
  shirtimg?: string;
  pantimg?: string;
  isDislike?: boolean;
  isBookMarked?: boolean;
}

export class User {
  userId: string;
  userProduct: Product[];
  isFirsttime: boolean;
}

export class currentUserModel {
  email: string;
  name: string;
  photoUrl: string;
  id: string;
}


