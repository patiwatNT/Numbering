import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, ButtonModule,SkeletonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  numberingReportList: any[] = [];
  privilegeList: any[] = [];
  loading:boolean = false;
  constructor(
    private backendService: BackendService,
    private router: Router // private userService:UserService
  ) {}

  ngOnInit(): void {
    const privilege = JSON.parse(localStorage.getItem('privilege') as string);
    console.log('Privilege', privilege);
    this.privilegeList = privilege.filter(
      (privilege: { privilegeName: string | string[] }) =>
        privilege.privilegeName.includes('N-11') ||
        privilege.privilegeName.includes('N-12') ||
        privilege.privilegeName.includes('N-13') ||
        privilege.privilegeName.includes('N-14') ||
        privilege.privilegeName.includes('N-15') ||
        privilege.privilegeName.includes('N-16')
    );
    this.sendDataToBackendService();
  }

  sendDataToBackendService() {
    this.loading = true;
    this.backendService.findAllNumberingReport().subscribe(
      (response) => {
        console.log('Get Reponse Success : ', response);
        this.numberingReportList = response;
        // const user = this.userService.getUser();
        // console.log(user);
        this.numberingReportList.forEach((item) => {
          // Add additional fields to 'item' as needed
          let i = 0;
          item.privilege = this.privilegeList[i]; // Example: Adding a new field 'additionalField' with a value 'value'
          i++;
        });
        this.loading = false;
      },
      (error) => {
        console.log('Error :', error);
      }
    );
  }

  linkToAnotherReport(data: any) {
    this.router.navigateByUrl('/report/' + data);
  }
  checkAccess(access:string):boolean{
    if(access==='มีสิทธิ์'){
      return true
    }else{
      return false;
    }
  }
}
