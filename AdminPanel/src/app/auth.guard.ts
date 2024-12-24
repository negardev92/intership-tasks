import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../app/servise/auth.service'


@Injectable({
  providedIn: 'root',
})
export class adminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const user = this.authService.getUser();

    if (!user) {
     
      this.router.navigate(['/login']);
      return false;
    }

    if (route.data.role === 'admin' && user.role !== 'admin') {
      // اگر کاربر عادی بود و مسیر مربوط به ادمین بود
      this.router.navigate(['products/shopingcart']); // هدایت به صفحه سبد خرید
      return false;
    }

    if (route.data.role === 'user' && user.role !== 'user') {
      // اگر ادمین بود و مسیر مربوط به کاربر عادی بود
      this.router.navigate(['/admin']); // هدایت به صفحه ادمین
      return false;
    }

    return true; 
  }
}
