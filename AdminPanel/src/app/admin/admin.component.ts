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
  filteredUsers: any[] = [];
 foundUser:any 
 searchTerm =" "
 

  constructor(private authService: AuthService, private route: ActivatedRoute, private apiService: ApiGetUserService,) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.getUser().role === 'admin';
    this.apiService.getDataFromUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = this.users;
    });
  }
  filterUsers(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredUsers = this.users; 
      return;
    }
const foundUser = this.users.find(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
     if(foundUser){
      this.filteredUsers = foundUser ? [foundUser] : [];
      
     }else{
      this.filteredUsers = this.users; 
      
      alert("کابر وجود ندارد ")
     }
    this.searchTerm= " ";
  }
  
}

