import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // Token exists, redirect to another route (e.g., '/dashboard')
      this.router.navigateByUrl('/main');
      return false; // Prevent access to the login route
    } else {
      // No token found, allow access to the login route
      return true;
    }
  }
}
