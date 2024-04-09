import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { BackendService } from '../../../services/BackendService';
import { UserService } from '../../../services/user.service';
import { SkeletonModule } from 'primeng/skeleton';

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
  constructor(
    private loginService: LoginService,
    private backendService: BackendService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.sessionInfo();
    this.sendData('patiwat.sr');
  }

  sessionInfo() {
    this.loading = true;
    let data = {
      clientKey: 'bc2a5cd7-c13b-4c2e-a884-24f88b3f21f0',
      token: localStorage.getItem('token'),
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

  sendData(data: any) {
    this.loading = true;
    this.backendService.findUserDetail(data).subscribe(
      (response) => {
        this.user = response;
        console.log('User', this.user);
        this.userService.setUser(this.user.numberingUserPrivilegeList);
        this.loading = false;
      },
      (error) => {
        console.log('Error : ', error);
      }
    );
  }
}
