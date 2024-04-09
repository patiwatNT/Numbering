import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../../services/BackendService';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  username: string = '';
  password: string = '';
  loading: boolean = false;
  responseStatus: string = '';
  user: any = {};
  test:string = 'Test Text';
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router,
    private backendService: BackendService,
    private userService:UserService
  ) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  login(form: FormGroup) {
    this.loading = true;
    console.log(form.value.username, form.value.password);
    let username = form.value.username;
    let password = form.value.password;

    let data = {
      username: username,
      password: password,
      ip: '10.0.53.192',
      clientKey: 'bc2a5cd7-c13b-4c2e-a884-24f88b3f21f0',
    };

    this.loginService.login(data).subscribe(
      (response: any) => {
        console.log(response);
        this.responseStatus = response.result;
        if (this.responseStatus != 'fail') {
          localStorage.setItem('user', username);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('tokenExpire', response.data.session_expire);

          // this.router.navigateByUrl('/main').then(() => {
          //   this.loading = false;
          //   window.location.reload();
          // });
        } else {
          this.loading = false;
        }
      },
      (error) => {
        console.log(error.message);
        this.loading = false;
      }
    );
    this.backendService
      .findByUsername(localStorage.getItem('user') as string)
      .subscribe(
        (response) => {
          console.log('Get Respons Success :', response);
          localStorage.setItem('roleId', response.roleId.roleId);
          console.log('Role Id',localStorage.getItem('roleId'));
          this.getUserDetail(username);
        },
        (error) => {}
      );
  }

  signOut(form: FormGroup) {
    this.loading = true;
    console.log(form.value.username, form.value.password);

    let data = {
      clientKey: 'bc2a5cd7-c13b-4c2e-a884-24f88b3f21f0',
      token: 'gmWe91llaE2qU1sUoTAdhTU6jD7eUtyINgAxADUANQAxADAAOQAyADYA',
    };

    this.loginService.signOut(data).subscribe(
      (response: any) => {
        console.log(response);
        this.loading = false;
        localStorage.removeItem('token');
        window.location.reload();
      },
      (error) => {
        console.log(error.message);
        this.loading = false;
      }
    );
  }
  getUserDetail(data: any) {
    this.backendService.findUserDetail(data).subscribe(
      (response) => {
        this.user = response;
        console.log('User', this.user);
        const privilege = JSON.stringify(this.user.numberingUserPrivilegeList);
        localStorage.setItem('privilege',privilege)
        console.log('Privilege',localStorage.getItem('privilege'));
      },
      (error) => {
        console.log('Error : ', error);
      }
    );
  }
}
