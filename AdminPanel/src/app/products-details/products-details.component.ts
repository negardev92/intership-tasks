import {GetApiProdcutsService } from '../servise/get-api-prodcuts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  @Input() productDetails: any; // اطلاعات محصول
  @Output() addToCartEvent = new EventEmitter<any>(); 
  quantity: number = 1; 

  constructor() {}

  ngOnInit() {}

  increaseQuantity() {
    if (this.quantity < this.productDetails.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    const cartItem = {
      product: this.productDetails,
      quantity: this.quantity
    };
    this.addToCartEvent.emit(cartItem); // ارسال اطلاعات به والد
  }
}

