import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]); 
  cartItems$ = this.cartItemsSubject.asObservable(); 

  constructor() {}

  getCartItems() {
    return this.cartItemsSubject.value;
  }

  getCartItemById(productId: number) {
    return this.getCartItems().find((item) => item.product?.id === productId);
  }

  addToCart(newItem: any) {
    const existingItems = this.getCartItems();
    const existingItem = existingItems.find(
      (item) => item.product.id === newItem.product.id
    );
  

    if (existingItem) {
      this.updateQuantity(
        newItem.product.id,
        existingItem.quantity + newItem.quantity
      );
    } else {
      this.cartItemsSubject.next([...existingItems, newItem]);
    }
  }
  

  updateQuantity(productId: number, quantity: number) {
    const items = this.cartItemsSubject.value;
    const itemIndex = items.findIndex(item => item.product?.id === productId);
  
    if (itemIndex !== -1) {
      items[itemIndex].quantity = quantity;
      this.cartItemsSubject.next(items);
    } else {
      console.error('Item not found in cart!');
      this.addToCart({ product: { id: productId }, quantity });
    }
  }

  increaseQuantity(productId: number, maxQuantity: number) {
    
    const cartItem = this.getCartItemById(productId);
    if (cartItem && cartItem.quantity < maxQuantity) {
      this.updateQuantity(productId, cartItem.quantity + 1);
    } else if (!cartItem && maxQuantity > 0) {
      this.addToCart({ product: { id: productId }, quantity: 1 });
    }
  }
  
  decreaseQuantity(productId: number) {
    const items = this.cartItemsSubject.value;
    const itemIndex = items.findIndex(item => item.product?.id === productId);
  
    if (itemIndex !== -1) {
      items[itemIndex].quantity = Math.max(0, items[itemIndex].quantity - 1);
      this.cartItemsSubject.next(items);
    } else {
      console.error('Item not found in cart!');
    }
  }

  calculateTotal() {
    return this.getCartItems().reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}
