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
  userId: any;
  searchTerm: string | null = null;
  filteredUsers: any[] = [];
  constructor(private authService: AuthService, private route: ActivatedRoute, private apiService: ApiGetUserService,) { }

  
ngOnInit(): void {
  this.isAdmin = this.authService.getUser().role === 'admin';
  this.apiService.getDataFromUsers().subscribe(data => {
    this.users = data;
    
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || null;
     
      if (this.searchTerm) {
        this.users = this.users.filter(user =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          
        );
      }else{
        this.users = data;
      }
    });
  });
}
  
  
}

