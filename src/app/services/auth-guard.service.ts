import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import moment from 'moment';
import { Observable, interval } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  tokenStatus: string = '';
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      interval(600000).subscribe((x) => {
        this.sessionInfo();
        if (this.tokenStatus === 'fail') {
          localStorage.removeItem('token');
          console.log('Remove Token');
          window.location.reload();
        } else {
          this.extendTokenSession();
        }
      });
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  extendTokenSession() {
    let data = {
      token: localStorage.getItem('token'),
      clientKey: 'bc2a5cd7-c13b-4c2e-a884-24f88b3f21f0',
      ip: '10.0.53.192',
    };
    this.loginService.extendSession(data).subscribe(
      (response) => {
        console.log('Extend Token Success', response);
      },
      (error) => {
        console.log('Error ', error);
      }
    );
  }

  sessionInfo() {
    let data = {
      clientKey: 'bc2a5cd7-c13b-4c2e-a884-24f88b3f21f0',
      token: localStorage.getItem('token'),
    };

    this.loginService.sessionInfo(data).subscribe(
      (response: any) => {
        console.log(response);
        this.tokenStatus = response.result;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
}
