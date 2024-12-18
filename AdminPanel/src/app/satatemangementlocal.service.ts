
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSource = new BehaviorSubject<any[]>(this.getLocalUsers());
  users$ = this.usersSource.asObservable();

  constructor() {}

  getLocalUsers(): any[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  
updateUsers(users: any[]) {
  localStorage.setItem('apiusers', JSON.stringify(users)); 
  this.usersSource.next(users);
}
}