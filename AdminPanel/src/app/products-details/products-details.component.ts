
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CartService } from '../servise/shared.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {
  @Input() productDetails: any; 
  @Output() addToCartEvent = new EventEmitter<any>();
  quantity: number = 0;



  constructor(private cartService: CartService) {}
 
  ngOnInit() {
    
    if (this.productDetails) {
      const cartItem = this.cartService.getCartItemById(this.productDetails.id);
      if (cartItem) {
        this.quantity = cartItem.quantity;
      }
    }
  
    this.cartService.cartItems$.subscribe((items) => {
      const cartItem = items.find(item => item.product?.id === this.productDetails?.id);
      this.quantity = cartItem ? cartItem.quantity : 0;
    });
  }


  increaseQuantity() {
    this.cartService.increaseQuantity(this.productDetails.id);
  }

  decreaseQuantity() {
    this.cartService.decreaseQuantity(this.productDetails.id);
  }

  addToCart() {
      console.log('Quantity:', this.quantity);
      console.log('Product Details:', this.productDetails);
    
      if (this.quantity > 0 && this.quantity <= this.productDetails.quantity) {
        const cartItem = {
          product: this.productDetails,
          quantity: this.quantity,
        };
    
       
        const updatedItem = this.cartService.getCartItemById(this.productDetails.id);
        this.quantity = updatedItem ? updatedItem.quantity : 0;
      } 
    }
    
  }
  



