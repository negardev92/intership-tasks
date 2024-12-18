
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../app/servise/auth.service';;
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiGetUserService } from '../../app/servise/api-get-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  username: string = '';
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  private subscription?: Subscription;
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = "";

  constructor(private authService: AuthService, private router: Router, private apiService: ApiGetUserService) {}

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn; 
      const user = this.authService.getUser();
      if (this.isLoggedIn) {
        this.username = user.username; 
        this.isAdmin = user.role === 'admin'; 
        console.log('Current User:', this.username); 
      } else {
        this.username = '';
        this.isAdmin = false; 
      }
    });
    this.apiService.getDataFromUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = this.users;
    });
  }

 
  btnlogout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}