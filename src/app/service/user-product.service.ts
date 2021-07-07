import { Injectable } from '@angular/core';
import { User } from '../Model/model';

@Injectable({
  providedIn: 'root'
})
export class UserProductService {
  users: User[];
  user: User;

  constructor() {
    this.users = JSON.parse(localStorage.getItem("users"));
  }

  get(id: any) {
    for (var i of this.users) {
      if (i.userId === id) {
        this.user = i;
        return this.user;
      }
    }

  }
}
