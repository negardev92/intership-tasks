
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

  // ngOnInit() {
  //   if (this.productDetails) {
  //     const cartItem = this.cartService.getCartItemById(this.productDetails.id);
  //     if (cartItem) {
  //       this.quantity = cartItem.counter;
  //     }
  //   }

  //   this.cartService.cartItems$.subscribe((items) => {
  //     const cartItem = items.find(item => item.id === this.productDetails?.id);
  //     this.quantity = cartItem ? cartItem.counter : 0;
  //   });
  // }
  ngOnInit() {
    if (this.productDetails) {
      const cartItem = this.cartService.getCartItemById(this.productDetails.id);
      this.quantity = cartItem ? cartItem.counter : 0; // تعداد از سبد خرید
    }
  
    this.cartService.cartItems$.subscribe((items) => {
      const cartItem = items.find(item => item.id === this.productDetails?.id);
      this.quantity = cartItem ? cartItem.counter : 0;
    });
  }

  increaseQuantity() {
    this.cartService.increaseQuantity(this.productDetails.id);
  }

  decreaseQuantity() {
    this.cartService.decreaseQuantity(this.productDetails.id);
  }

  addToCart() {
    
      if (this.quantity > 0 && this.quantity <= this.productDetails.quantity) {
        const cartItem = {
          id: this.productDetails.id,
          name: this.productDetails.name,
          price: this.productDetails.price,
          imageUrl: this.productDetails.imageUrl,
          counter: this.quantity, 
          quantity: this.productDetails.quantity 
        };
        
        this.cartService.addToCart(cartItem);
      }
  }
}

  



