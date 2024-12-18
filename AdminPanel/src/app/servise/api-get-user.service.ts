import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface User {
  username: string;
  email: string;
  password: string;
  phone: number; 
  role: string; 
}
@Injectable({
  providedIn: 'root'
})
export class ApiGetUserService {

  private apiUsers = 'https://jsonplaceholder.typicode.com/users';;
  private apiPosts = 'https://jsonplaceholder.typicode.com/posts';
  private apiAlbums = 'https://jsonplaceholder.typicode.com/albums';
  private apiTask = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) { }

  getDataFromUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUsers);
  }

  getDataFromPost(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiPosts}?userId=${userId}`);
  }

  getDataFromaAlbums(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiAlbums}?userId=${userId}`);
  }

  getDataFromaTask(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiTask}?userId=${userId}`);
  }
  
}
