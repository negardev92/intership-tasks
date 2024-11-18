
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

  constructor(private authService: AuthService, private router: Router) {}

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