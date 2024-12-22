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
  private cartItems: CartItem[] = [];
  private cartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartSubject.asObservable();

  constructor() {}

  // ارسال اطلاعات سبد خرید به کامپوننت‌ها
  getCartItems() {
    return this.cartSubject.asObservable();
  }

  // افزودن محصول به سبد خرید
 
    addToCart(product: CartItem) {
      
      const existingItem = this.cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // اگر محصول قبلاً در سبد خرید وجود دارد، تعداد آن را به‌روز می‌کنیم
        existingItem.counter += product.counter;
      } else {
        // اگر محصول جدید است، آن را به سبد خرید اضافه می‌کنیم
        this.cartItems.push(product);
      }
      
      // بروزرسانی وضعیت سبد خرید با استفاده از BehaviorSubject
      this.cartSubject.next(this.cartItems);
    };
    
  

  
  increaseQuantity(productId: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item && item.counter < item.quantity) {
      item.counter++;
      this.cartSubject.next(this.cartItems); 
    }
  }

  // کاهش تعداد محصول
  decreaseQuantity(productId: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item && item.counter > 1) {
      item.counter--;
      this.cartSubject.next(this.cartItems); // بروزرسانی وضعیت سبد خرید
    }
  }

  // حذف محصول از سبد خرید
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartSubject.next(this.cartItems); // بروزرسانی وضعیت سبد خرید
  }

  // دریافت محصول از سبد خرید بر اساس ID
  getCartItemById(productId: number): CartItem | undefined {
    return this.cartItems.find(item => item.id === productId);
  }
}
