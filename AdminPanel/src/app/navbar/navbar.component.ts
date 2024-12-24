import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../app/servise/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  username: string = '';
  isLoggedIn = false;
  isAdmin = false;
  private subscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      const user = this.authService.getUser();
      if (user) {
        this.username = user.username; 
        this.isAdmin = user.role === 'admin'; 
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
