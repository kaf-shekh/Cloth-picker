import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkComponent } from "./product/bookmark/bookmark.component";
import { HomeComponent } from './home/home.component';
import { AddImageComponent } from './product/add-image/add-image.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'bookmark', component: BookmarkComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  { path: 'add', component: AddImageComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
