import { Component, Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-root',
  template: `<app-header></app-header>
  <router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() { }

}
