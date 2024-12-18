
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false); 

  constructor() {
    this.stated();
  }

  stated(){
    const user = this.getUser();
    if (user && user.username) {
      this.isAuthenticated.next(true); 
    }
  }

  register(username: string, password: string, role: string): boolean {
    const users = this.getUsers();
    if (users.some((u: { username: string }) => u.username === username)) {
      return false; // کاربر قبلاً وجود دارد
    }

    const newUser = { username, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // ذخیره کاربران
    return true;
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      (u: { username: string; password: string }) =>
        u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // ذخیره کاربر فعلی
      this.isAuthenticated.next(true);
      return true;
    }
    return false; // کاربر یافت نشد
  }

  logout() {
    // localStorage.removeItem('user'); // حذف کاربر از لاگین
    this.isAuthenticated.next(false);
  }

  isLoggedIn() {
    return this.isAuthenticated.asObservable();
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null'); // بررسی کاربر ذخیره‌شده
  }

  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]'); // بازیابی لیست کاربران
  }
  
 

}