import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../app/servise/auth.service';;
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser(); 
  if (user) {
    return true; 
  } else {
    router.navigate(['/login']); 
    return false; 
  }
};

