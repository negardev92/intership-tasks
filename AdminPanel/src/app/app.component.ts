
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}


  ngOnInit(): void {
    // اشتراک در وضعیت ورود کاربر
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn; // بروزرسانی وضعیت ورود
    });
  }
}