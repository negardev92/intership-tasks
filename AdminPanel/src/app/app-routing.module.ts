import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {  adminGuard } from './auth.guard';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { ProductsComponent } from './products/products.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [ adminGuard],children:[{ path: 'user/:id', component:UserComponent},{ path: 'edite/:id', component: EditUserComponent },] },
  
  { path: 'products', component:  ProductsComponent ,children:[
    { path: 'products/shopingcart', component: ShopingCartComponent , canActivate: [adminGuard] },
    { path: 'ProductsDetails/:id', component: ProductsDetailsComponent },
  ] },
  
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
