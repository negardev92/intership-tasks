import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  counter: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.cartItems);
  cartItems$ = this.cartSubject.asObservable();

  constructor() {}

  private updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: CartItem) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.counter += product.counter;
    } else {
      this.cartItems.push(product);
    }
    this.cartSubject.next(this.cartItems);
    this.updateLocalStorage();
  }

  increaseQuantity(productId: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item && item.counter < item.quantity) {
      item.counter++;
      this.cartSubject.next(this.cartItems);
      this.updateLocalStorage();
    }
  }

  decreaseQuantity(productId: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item && item.counter > 1) {
      item.counter--;
      this.cartSubject.next(this.cartItems);
      this.updateLocalStorage();
    }
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartSubject.next(this.cartItems);
    this.updateLocalStorage();
  }

  getCartItemById(productId: number): CartItem | undefined {
    return this.cartItems.find(item => item.id === productId);
  }
}
