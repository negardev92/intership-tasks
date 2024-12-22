import { Component, OnInit } from '@angular/core';
import { GetApiProdcutsService } from '../servise/get-api-prodcuts.service';
import { Router } from '@angular/router';
import { CartService } from '../servise/shared.service';
import * as bootstrap from 'bootstrap';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  counter?: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(
    private GetApiprodcut: GetApiProdcutsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
     this.GetApiPro();
  }

  GetApiPro() {
    this.GetApiprodcut.getDataProdcut().subscribe(data => {
      this.products = data.map(product => ({
        ...product,
        counter: 1
      }));
    });
  }

  openModal(product: Product) {
    
    const cartItem = this.cartService.getCartItemById(product.id);
    this.selectedProduct = {
      ...product,
      counter: cartItem ? cartItem.counter : 1 // اگر در سبد خرید است، مقدار را بگیر وگرنه مقدار اولیه 1 باشد
    };
  
    const modalElement = document.getElementById('productDetailsModal');
    if (modalElement) {
      const bootstrapModal = new bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  }
 
  

  increaseQuantity() {
    if (this.selectedProduct && this.selectedProduct.counter < this.selectedProduct.quantity) {
      this.selectedProduct.counter++;
    }
  }

  decreaseQuantity() {
    if (this.selectedProduct && this.selectedProduct.counter > 1) {
      this.selectedProduct.counter--;
    }
  }

  addToCart() {
    if (this.selectedProduct && this.selectedProduct.counter >= 1) {
      const cartItem = { ...this.selectedProduct, counter: this.selectedProduct.counter };
        this.cartService.addToCart(cartItem);
    }
  }
}
 
  




