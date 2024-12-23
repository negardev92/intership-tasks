import { Component, OnInit } from '@angular/core';
import { ApiGetUserService } from '../../app/servise/api-get-user.service';
import { AuthService } from '../../app/servise/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../app/servise/satatemangementlocal.service';;

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
  ngOnInit(): void {
    this.isAdmin = this.authService.getUser()?.role === 'admin';

    this.apiService.getDataFromUsers().subscribe(data => {
      this.ApiUsers = data;
      // this.userService.updateUsers(data);
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

  





