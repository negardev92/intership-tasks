
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSource = new BehaviorSubject<any[]>([]);
  users$ = this.usersSource.asObservable();

  constructor() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    this.usersSource.next(storedUsers);
  }

  updateUsers(users: any[]) {
    this.usersSource.next(users);
    localStorage.setItem('users', JSON.stringify(users)); 
  }
}