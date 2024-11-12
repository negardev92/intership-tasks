import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserShowComponent } from './user-show/user-show.component';
import { ApiService } from './api-call.service';
import { HttpClientModule } from '@angular/common/http';
import { UserCartComponent } from './user-cart/user-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    UserShowComponent,
    UserCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
