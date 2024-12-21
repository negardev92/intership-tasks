import { Component, Input } from '@angular/core';
import { CartService } from '../servise/shared.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent {
  cartItems: any[] = [];
  totalPrice: any;
  

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  increaseItemQuantity(productId: number, maxQuantity: number) {
    this.cartService.increaseQuantity(productId, maxQuantity);
  }

  decreaseItemQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  calculateTotal() {
    this.totalPrice = this.cartService.calculateTotal();
  }
}
 
  

 

 

