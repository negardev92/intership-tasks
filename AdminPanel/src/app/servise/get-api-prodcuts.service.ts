import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetApiProdcutsService implements OnInit{

  constructor(private http:HttpClient) { }

  private apiProdct = 'assets/products.json';
  ngOnInit() {
  this.getDataProdcut();
    
  }
    getDataProdcut(): Observable<any[]> {
      return this.http.get<any[]>(this.apiProdct);
      
    }
  
  
}
