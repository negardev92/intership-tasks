import { Component, Input } from '@angular/core';
import { CartService } from '../servise/shared.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent {
  cartItems: any[] = [];
  

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items; 
     
    });
  }
 
  increaseQuantity(item: any) {
    this.cartService.updateQuantity(item.product.id, item.quantity + 1)
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 0) {
      this.cartService.updateQuantity(item.product.id, item.quantity - 1);
    }
  }
  calculateTotal() {
    return this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }



  }

