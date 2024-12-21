import { Component, OnInit } from '@angular/core';
import {GetApiProdcutsService } from '../servise/get-api-prodcuts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../servise/shared.service';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number; 
  imageUrl: string;
}
export interface CartItem {
  product: Product;
  quantity: number;// chose clinet 
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit{
  products: Product[] = []; 
  // isLoggedIn: boolean = false;
  productId!: number;
  selectedProduct: Product | null = null; 
  cartItems: CartItem[] = [];
  isCartVisible = false;


constructor(private GetApiprodcut:GetApiProdcutsService,private router: Router,private route: ActivatedRoute, private cartService: CartService){}
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
 toggleCart() {
  this.isCartVisible = !this.isCartVisible; 
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
handleAddToCart(cartItem: CartItem) {
  this.cartService.addToCart(cartItem);
  

}
}

