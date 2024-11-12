import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserCartComponent } from './user-cart/user-cart.component';
import { UserShowComponent } from './user-show/user-show.component';

const routes: Routes = [
  { path: '',redirectTo:'user',pathMatch:"full"},
  { path: 'user', component: UserShowComponent, },
  { path: 'user/:id', component: UserCartComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
