import { Component, OnInit } from '@angular/core';
import {GetApiProdcutsService } from '../servise/get-api-prodcuts.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products:any[]
isLoggedIn: any;
productId!: number;
constructor(private GetApiprodcut:GetApiProdcutsService,private router: Router,private route: ActivatedRoute){}
ngOnInit(){
  this.GetApiPro(); 
  this.route.params.subscribe(params => {
    this.productId = +params['id']; 
  });
}


 GetApiPro(){
  this.GetApiprodcut. getDataProdcut().subscribe(data => {
    this.products = data;
  });
 }

 moredetil(productId){
  this.router.navigate(['products/ProductsDetails', productId]);
 }



}
