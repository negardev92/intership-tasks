

import { Component, OnInit } from '@angular/core';
import { ApiGetUserService } from '../api-get-user.service'; 
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  users: any[] = [];
  isAdmin: boolean = false;
  userId:any;

  constructor( private authService: AuthService, private route: ActivatedRoute,private apiService: ApiGetUserService,) {}
  
ngOnInit(): void {
  
  this.isAdmin = this.authService.getUser().role === 'admin'; 

  
  this.apiService.getDataFromUsers().subscribe(data => {
    this.users = data;
  });

  
  // this.route.paramMap.subscribe(params => {
  //   const userId = +params.get('id'); // Use bracket notation
  //   console.log("User ID:", userId);
  //   if (!isNaN(userId)) {
  //    // Call your method to fetch user data
  //   } else {
  //     console.error('Invalid User ID:', params.get('id'));
  //   }
  // });
}
}
