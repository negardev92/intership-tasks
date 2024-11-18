import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authService.register(this.username, this.password, this.role)) {
      this.router.navigate(['/login']); 
    } else {
      this.errorMessage = 'کاربر با این نام کاربری قبلاً وجود دارد!';
    }
  }
}