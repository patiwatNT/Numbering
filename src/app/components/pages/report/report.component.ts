import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, ButtonModule, SkeletonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent implements OnInit {
  numberingReportList: any[] = [];
  privilegeList: any[] = [];
  privilegeFilterList: any[] = [];
  privilege: any;
  loading: boolean = false;
  constructor(
    private backendService: BackendService,
    private router: Router,
    private userService: UserService,
    private cookies: CookieService
  ) {}

  ngOnInit(): void {
    this.privilege = JSON.parse(this.cookies.get('privilege'));
    console.log(this.privilege);
    const repObjects = [];

    for (let i = 1; i <= 5; i++) {
      const repObject = {
        rep1: this.privilege[`rep${i}`],
      };
      repObjects.push(repObject);
    }

    this.privilegeList.push(...repObjects);
    this.privilegeList.push({rep1:1})
    console.log(this.privilegeList);
    // this.privilegeFilterList =  this.privilegeList = this.privilege.filter(
    //   (privilege: { privilegeName: string | string[] }) =>
    //     privilege.privilegeName.includes('rep1') ||
    //     privilege.privilegeName.includes('rep2') ||
    //     privilege.privilegeName.includes('rep3') ||
    //     privilege.privilegeName.includes('rep4') ||
    //     privilege.privilegeName.includes('rep5') ||
    //     privilege.privilegeName.includes('rep6')
    // );
    // console.log(this.privilegeFilterList);
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
        let i = 0;
        this.numberingReportList.forEach((item) => {
          // Add additional fields to 'item' as needed
          console.log(i, this.privilegeList[i]);
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
  checkAccess(access: any): boolean {
    if (access == 1) {
      return true;
    } else {
      return false;
    }
  }
}
