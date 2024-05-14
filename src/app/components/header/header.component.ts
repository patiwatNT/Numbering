import { BackendService } from './../../services/BackendService';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  loading:boolean = false;
  user:string|null = '';
  constructor(
    private backendService: BackendService,
    private loginService: LoginService,
    private cookies: CookieService
  ) {}
  ngOnInit(): void {
    console.log(this.cookies.get('user'));
    this.user = this.cookies.get('user');
  }
  init() {
    this.backendService.init().subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
        // Handle response from backend if needed
      },
      (error) => {
        console.error('Error sending data:', error);
        // Handle error if needed
      }
    );
  }
  signOut(){
    this.loading = true;

    let data = {
      "clientKey":"bc2a5cd7-c13b-4c2e-a884-24f88b3f21f0",
      "token":"gmWe91llaE2qU1sUoTAdhTU6jD7eUtyINgAxADUANQAxADAAOQAyADYA"
    }

    this.loginService.signOut(data).subscribe(
      (response:any)=>{
        console.log(response);
        this.loading = false;
        localStorage.removeItem('token');
        window.location.reload();
      },
      (error)=>{
        console.log(error.message);
        this.loading = false;
      }
    );
  }
}
