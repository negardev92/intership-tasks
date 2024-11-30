import { Component, OnInit } from '@angular/core';
import { ApiGetUserService } from '../api-get-user.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../satatemangementlocal.service';

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
  local:[]=[]
  constructor(private authService: AuthService, private route: ActivatedRoute, private apiService: ApiGetUserService, private router: Router,private userService: UserService ) { }


  ngOnInit(): void {
    this.isAdmin = this.authService.getUser().role === 'admin';
    

    this.apiService.getDataFromUsers().subscribe(data => {
      this.users = data;
      if(localStorage==null){
        localStorage.setItem('users', JSON.stringify(this.users));
      }
      
    console.log(this.users);
    
      
      this.userService.users$.subscribe(users => {
        this.users = users;
      });
    
      console.log(this.users);
      this.route.queryParams.subscribe(params => {
        this.searchTerm = params['search'] || null;

        if (this.searchTerm) {
          this.users = this.users.filter(user =>
            user.name.toLowerCase().includes(this.searchTerm.toLowerCase())

          );
        } else {
          // this.users = data;
        }
        
      });

    });
  }
 
  filterUsers(searchTerm: string): void {
    if (!searchTerm) {
      this.filteredUsers = this.users;
      const SendQeuryPramsNullInput = this.router.navigate([], { queryParams: { search: null } });
      //when input emty 
      if (SendQeuryPramsNullInput) {
        this.filteredUsers = this.users;
      }
      return;
    }
    //set
    this.router.navigate([], { queryParams: { search: searchTerm } });
    //read
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || null;
    });
    //find
    const foundUser = this.users.find(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    if (foundUser) {
      this.filteredUsers = [foundUser];
    } else {
      alert("کاربر وجود ندارد");
      this.router.navigate([], { queryParams: { search: null } });
    }
    this.searchTerm = "";

  }

  
}




