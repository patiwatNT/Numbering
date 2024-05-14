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
import { UserService } from './user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  tokenStatus: string = '';
  token:string = '';
  constructor(private router: Router, private loginService: LoginService, private userService:UserService,private cookies:CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      const token =  this.cookies.get('token');
      console.log(token);
    if (token) {
      interval(600000).subscribe((x) => {
        this.sessionInfo();
        if (this.tokenStatus === 'fail') {
          localStorage.clear();
          console.log('Remove Token');
          window.location.reload();
        } else {
          this.extendTokenSession();
        }
      });
      console.log('Token Valid');
      return true;
    } else {
      this.router.navigateByUrl('/login');
      console.log("No Token Found");
      return false;
    }
  }

  extendTokenSession() {
    let data = {
      token: this.cookies.get('token'),
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
    this.userService.token$.subscribe((value) => {
      this.token = this.cookies.get('token');
      console.log(this.token);
    });
    const token = this.token
    let data = {
      clientKey: 'bc2a5cd7-c13b-4c2e-a884-24f88b3f21f0',
      token: token,
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
