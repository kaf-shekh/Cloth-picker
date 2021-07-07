import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookmarkComponent } from './product/bookmark/bookmark.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ComponentsComponent } from './components/components.component';
import { AddImageComponent } from './product/add-image/add-image.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    AppComponent,
    BookmarkComponent,
    HomeComponent,
    HeaderComponent,
    ComponentsComponent,
    AddImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule,
    NgbModule,
    FontAwesomeModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              'e0d84ae56101223872691c9ad373369c'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('959453010827-rllo7k3he84qat682t0maqfftlc1n2l9.apps.googleusercontent.com') // your client id
          }
        ]
      }
    },
  ],
  exports: [AddImageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
