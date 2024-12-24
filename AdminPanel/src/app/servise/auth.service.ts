import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string | null>(null);

  constructor() {
    this.initializeState();
  }

  private initializeState() {
    const user = this.getUser();
    if (user && user.username) {
      this.isAuthenticated.next(true);
      this.userRole.next(user.role); 
    }
  }

  register(username: string, password: string, role: string): boolean {
    const users = this.getUsers();
    if (users.some((u: { username: string }) => u.username === username)) {
      return false;
    }

    const newUser = { username, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      (u: { username: string; password: string }) =>
        u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.isAuthenticated.next(true);
      this.userRole.next(user.role); 
      return true;
    }
    return false; 
  }

  logout() {
    localStorage.removeItem('user'); 
    this.isAuthenticated.next(false);
    this.userRole.next(null); 
  }

  isLoggedIn() {
    return this.isAuthenticated.asObservable();
  }

  getRole() {
    return this.userRole.asObservable();
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null'); 
  }

  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]'); 
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user && user.role === 'admin';
  }
}
