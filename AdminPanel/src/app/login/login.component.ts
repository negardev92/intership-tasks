
import { Component } from '@angular/core';
import { AuthService } from '../../app/servise/auth.service';;
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null;
  isAdmin: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // ابتدا بررسی کنید که نام کاربری و رمز عبور درست است یا خیر
    if (this.authService.login(this.username, this.password)) {
      // بررسی نقش کاربر
      const user = this.authService.getUser();
      if (user) {
        this.isAdmin = user.role === 'admin'; 
        if (this.isAdmin) {
          
          this.router.navigate(['admin']);
        } else {
          
          this.router.navigate(['products']);
        }
      }
    } else {
      
      this.errorMessage = 'نام کاربری یا رمز عبور اشتباه است!';
    }
  }

}





 
