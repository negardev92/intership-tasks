import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api-call.service';


@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css']
})
export class UserShowComponent {
  users: any[] = [];

  constructor(private apiService: ApiService){
    this.apiService.getDataFromUsers().subscribe(data => {
      this.users = data;
   
    });

  }
 
}
