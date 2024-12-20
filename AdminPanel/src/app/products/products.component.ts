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
selectedProduct: any = null;
constructor(private GetApiprodcut:GetApiProdcutsService,private router: Router,private route: ActivatedRoute){}
ngOnInit(){
  this.GetApiPro(); 
  this.closeModal();

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
  
  this.openModal(productId);
 }
 
 openModal(productId:number) {
  this.selectedProduct = this.products.find(product => product.id === productId); 
  
  const modalElement = document.getElementById('productDetailsModal');
  if (modalElement) {
    modalElement.style.display = 'block';
    modalElement.classList.add('show');
  }else {
    console.error('Products not loaded yet!');
  }
}

closeModal() {
  const modalElement = document.getElementById('productDetailsModal');
  if (modalElement) {
    modalElement.style.display = 'none';
    modalElement.classList.remove('show');
  }
}



}
