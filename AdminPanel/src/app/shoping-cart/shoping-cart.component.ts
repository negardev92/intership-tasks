import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../app/servise/shared.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css'],
})
export class ShopingCartComponent implements OnInit {
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

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  preventClose(event: MouseEvent) {
    event.stopPropagation();
  }

  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price * item.counter,
      0
    );
  }

 
}
