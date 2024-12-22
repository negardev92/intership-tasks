import { Component, Input } from '@angular/core';
import { CartItem, CartService } from '../servise/shared.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0; 
  isSidebarOpen: boolean = false; 
    constructor(private cartService: CartService) {}
  
    ngOnInit(): void {
      this.cartService.cartItems$.subscribe((items) => {
        this.cartItems = items;
         this.calculateTotal();  
      });
    }
 
  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  preventClose(event: MouseEvent) {
    event.stopPropagation(); 
  }
  
  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }
  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + (item.price * item.counter),
      0
    );
  }
}


 

