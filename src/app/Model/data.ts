import { User, Product } from "./model";

export const ClothPicker: User[] =
  [{
    userId: "123",
    userProduct: [{
      ProductId: 1,
      shirtimg: "../../assets/shirt/lightBlue.jpg",
      pantimg: "../../assets/pant/brown.jpg",
      isDislike: false,
      isBookMarked: true
    },
    {
      ProductId: 2,
      shirtimg: "../../assets/shirt/darkBlue.jpg",
      pantimg: "../../assets/pant/black.jpg",
      isDislike: false,
      isBookMarked: false
    },
    ],
    isFirsttime: false,
  }
  ];

export const UserData = [
  {
    userId: 123,
    ProductId: 123,


  }

]

