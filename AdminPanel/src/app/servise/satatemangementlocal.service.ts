
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
    return JSON.parse(localStorage.getItem('apiuser') || '[]');
  }

  
updateUsers(data: any[]) {
  localStorage.setItem('apiusers', JSON.stringify(data)); 
  this.usersSource.next(data);
}
}