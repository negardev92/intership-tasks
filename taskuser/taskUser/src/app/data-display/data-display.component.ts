
import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent {
  users: any[] = [];
  posts: any[] = [];
  albums: any[] = [];
  tasks: any[] = [];
  currentView: string = '';


  constructor(private apiService: ApiService) {
    
  }
 



}