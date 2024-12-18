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
  ApiUsers: any[] = [];
  filteredUsers: any[] = [];
  isAdmin: boolean = false;
  searchTerm: string | null = null;
  
  constructor(private authService: AuthService, private route: ActivatedRoute, private apiService: ApiGetUserService, private router: Router,private userService: UserService ) { }


  // ngOnInit(): void {
  //   this.isAdmin = this.authService.getUser()?.role === 'admin';
    

  //   this.apiService.getDataFromUsers().subscribe(data => {
  //     this.ApiUsers = data;
  //     this.userService.updateUsers(data);
  //       localStorage.setItem('apiuser', JSON.stringify(this.ApiUsers));
        
  //     });
    
      
  //     this.route.queryParams.subscribe(params => {
  //       this.searchTerm = params['search'] || null;

  //       if (this.searchTerm) {
  //         this.ApiUsers = this.ApiUsers.filter(user =>
  //           user.name.toLowerCase().includes(this.searchTerm.toLowerCase())

  //         );
  //       } else {
  //         // this.users = data;
  //       }
        
  //     });

  //  ;
  // }
 
  // filterUsers(searchTerm: string): void {
  //   if (!searchTerm) {
  //     this.filteredUsers = this.ApiUsers;
  //     const SendQeuryPramsNullInput = this.router.navigate([], { queryParams: { search: null } });
  //     //when input emty 
  //     if (SendQeuryPramsNullInput) {
  //       this.filteredUsers = this.ApiUsers;
  //     }
  //     return;
  //   }
  //   //set
  //   this.router.navigate([], { queryParams: { search: searchTerm } });
  //   //read
  //   this.route.queryParams.subscribe(params => {
  //     this.searchTerm = params['search'] || null;
  //   });
  //   //find
  //   const foundUser = this.ApiUsers.find(user =>
  //     user.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );


  //   if (foundUser) {
  //     this.filteredUsers = [foundUser];
  //   } else {
  //     alert("کاربر وجود ندارد");
  //     this.router.navigate([], { queryParams: { search: null } });
  //   }
  //   this.searchTerm = "";

  // }
  ngOnInit(): void {
    this.isAdmin = this.authService.getUser()?.role === 'admin';

    this.apiService.getDataFromUsers().subscribe(data => {
      this.ApiUsers = data;
      //this.userService.updateUsers(data);
    });

    this.userService.users$.subscribe(users => {
      this.ApiUsers = users;
      this.filteredUsers = [...this.ApiUsers];
    });

    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || null;
      if (this.searchTerm) {
        this.filterUsers(this.searchTerm, false);
      }
    });
  }

  filterUsers(searchTerm: string, updateQuery: boolean = true): void {
    if (!searchTerm) {
      this.filteredUsers = [...this.ApiUsers];
      if (updateQuery) {
        this.router.navigate([], { queryParams: { search: null }, queryParamsHandling: 'merge' });
      }
      return;
    }

    this.filteredUsers = this.ApiUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (updateQuery) {
      this.router.navigate([], { queryParams: { search: searchTerm }, queryParamsHandling: 'merge' });
    }

    if (this.filteredUsers.length === 0) {
      alert("کاربر وجود ندارد");
    }
  }
}

  





