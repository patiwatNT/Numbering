import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { BackendService } from '../../../services/BackendService';
import { UserService } from '../../../services/user.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,SkeletonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  loading: boolean = false;
  userDetail: any = {};
  privilegeList: any[] = [];
  user: any = {};
  privilegeMap = new Map<number, string>();
  authorized:boolean = false;
  token:string = '';
  constructor(
    private loginService: LoginService,
    private backendService: BackendService,
    private userService: UserService,
    private cookies: CookieService
  ) {}
  ngOnInit(): void {
    this.sessionInfo();
    this.sendData();
  }

  sessionInfo() {
    this.userService.token$.subscribe((value) => {
      this.token = this.cookies.get('token');
      console.log(this.token);
    });
    this.loading = true;
    let data = {
      clientKey: 'bc2a5cd7-c13b-4c2e-a884-24f88b3f21f0',
      token: this.token,
    };

    this.loginService.sessionInfo(data).subscribe(
      (response: any) => {
        console.log(response);
        this.userDetail = response.data;
        this.loading = false;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  checkAccess(access:string):boolean{
    if(access==='มีสิทธิ์'){
      return true
    }else{
      return false;
    }
  }

  sendData() {
    this.loading = true;
    this.backendService.findAllRole(this.cookies.get('empCode')).subscribe(
      (response) => {
        this.user = response;
        console.log('User', this.user);
        this.loading = false;
      },
      (error) => {
        console.log('Error : ', error);
      }
    );
  }
}
