import { Component, OnInit } from '@angular/core';
import { GetApiProdcutsService } from '../servise/get-api-prodcuts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../servise/shared.service';
import { AuthService } from '../../app/servise/auth.service'
import * as bootstrap from 'bootstrap';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  counter?: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  filteredProducts: Product[] = [];
  searchTerm: string = ''; // متغیر جستجو
 
  constructor(
    private GetApiprodcut: GetApiProdcutsService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) {}

  ngOnInit() {
    
  

     this.GetApiPro();

     this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.filterProducts(this.searchTerm, false); 
    });
    this.filterProducts(this.searchTerm, false);
  }

  GetApiPro() {
    this.GetApiprodcut.getDataProdcut().subscribe(data => {
      this.products = data.map(product => ({
        ...product,
        counter: 1
      }));
     
      this.filterProducts(this.searchTerm, false);
    });
    
  }
   //سرچ 
   filterProducts(searchTerm: string, updateQuery: boolean = true): void {
   //خالی
    if (!searchTerm) {
      
      this.filteredProducts = [...this.products];
      
      if (updateQuery) {
        this.router.navigate([], { queryParams: { search: null }, queryParamsHandling: 'merge' });
      }
      return;
    }
  // فیلتر
    this.filteredProducts = this.products.filter(x =>
      x.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
   
    if (updateQuery) {
      this.router.navigate([], { queryParams: { search: searchTerm }, queryParamsHandling: 'merge' });
    }
  
    
  }

  openModal(product: Product) {
    const cartItem = this.cartService.getCartItemById(product.id);
    this.selectedProduct = {
      ...product,
      counter: cartItem ? cartItem.counter : 1,
    };
  
    const modalElement = document.getElementById('productDetailsModal');
    if (modalElement) {
      modalElement.classList.remove('hidden');
    }
  }
  
  closeModal() {
    const modalElement = document.getElementById('productDetailsModal');
    if (modalElement) {
      modalElement.classList.add('hidden');
    }
  }
 
  

  increaseQuantity() {
    if (this.selectedProduct && this.selectedProduct.counter < this.selectedProduct.quantity) {
      this.selectedProduct.counter++;
    }
  }

  decreaseQuantity() {
    if (this.selectedProduct && this.selectedProduct.counter > 1) {
      this.selectedProduct.counter--;
    }
  }

  addToCart() {
    if (this.selectedProduct && this.selectedProduct.counter >= 1) {
      const cartItem = { ...this.selectedProduct, counter: this.selectedProduct.counter };
        this.cartService.addToCart(cartItem);
    }
  }

 
}
 
  




