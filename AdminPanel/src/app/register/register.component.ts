import { Component } from '@angular/core';
import { AuthService } from '../../app/servise/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = '';
  errorMessage: string | null = null;
  errorMessageuser:string | null = null;
  errorMessagePassword: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
   
    if (!this.username || !this.password || !this.role) {
      this.errorMessage = 'تمام فیلدها باید پر شوند.';
      return;
    }

    
    if (!/^\d+$/.test(this.password)) {
      this.errorMessagePassword = 'پسورد فقط باید شامل اعداد باشد.';
      return;
    }

   
    if (this.password.length < 4) {
      this.errorMessagePassword = 'طول پسورد باید حداقل 4 رقم باشد.';
      return;
    }

    
    const isRegistered = this.authService.register(
      this.username,
      this.password,
      this.role
    );
    debugger
    if (!isRegistered) {
      this.errorMessageuser = 'نام کاربری تکراری است.';
      return;
    }

    
    this.errorMessage = null;
    this.errorMessagePassword = null;
    alert('ثبت‌ نام با موفقیت انجام شد!');
    this.router.navigate(['/login']);
  }
}
