import { Component,OnInit } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { BackendService } from '../../../services/BackendService';
import { PhoneInfo } from '../../../models/phoneInfo';
import { SkeletonModule } from 'primeng/skeleton';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    SkeletonModule,
  ],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.scss',
})
export class PhoneComponent implements OnInit{
  phoneInfo!: PhoneInfo;
  phoneForm!: FormGroup;
  loading: boolean = false;
  products!: any;
  showInfo: boolean = false;
  checkEmpty: boolean = false;
  responeLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService,
    private router: Router
  ) {
    this.phoneForm = this.formBuilder.group({
      phoneInfo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      //newsDetail: ['<p>Default Detail</p>', Validators.required],
    });
  }

  ngOnInit(): void {
    if(this.router.url.includes('search')){
      const currentUrl = window.location.href;
      const phoneInfo = currentUrl.slice(currentUrl.indexOf('=')+1);
      this.backendService.findPhoneInfoById(phoneInfo).subscribe(
        (response) => {
          console.log('Data sent successfully:', response);
          if (response != null) {
            this.phoneInfo = response;
          } else {
            let phoneInfo: PhoneInfo = {
              phone: 'ไม่พบเลขหมายที่ค้นหา',
              serviceLocation: '-',
              crmStatus: '-',
              provider: '-',
              block: '-',
              assigned: '-',
              lastestBy: '-',
            };
            this.phoneInfo = phoneInfo;
          }
          this.loading = false;
          this.responeLoading = false;
          this.showInfo = true;
        },
        (error) => {
          console.error('Error sending data:', error);
          // Handle error if needed
          this.loading = false;
        }
      );
    }
  }
  Search(form: FormGroup) {
    if (!form.invalid) {
      this.sendDataToBackend(form);
    } else {
      this.checkEmpty = true;
    }
  }

  isActive(data:any){
    console.log(data.includes('ใช้งาน'));
    return data.includes('ใช้งาน');
  }

  isInactive(data:any){
    console.log(data.includes('คืน กสทช. แล้ว'));
    return data.includes('คืน กสทช. แล้ว');
  }

  isInprogress(data:any){
    console.log(data.includes('อยู่ระหว่างดำเนินการคืน กสทช.'));
    return data.includes('อยู่ระหว่างดำเนินการคืน กสทช.');
  }

  splitPhoneBlock(data:any): any{
    console.log(data);
    if(data!='-'){
      let info = data.slice(0,data.lastIndexOf(' '));
      let status = data.slice(data.lastIndexOf(' '));
      return [info,status];
    }else{
      return data;
    }
  }

  sendDataToBackend(form: FormGroup) {
    this.loading = true;
    this.responeLoading = true;
    this.backendService.findPhoneInfoById(form.value.phoneInfo).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
        if (response != null) {
          this.phoneInfo = response;
        } else {
          let phoneInfo: PhoneInfo = {
            phone: 'ไม่พบเลขหมายที่ค้นหา',
            serviceLocation: '-',
            crmStatus: '-',
            provider: '-',
            block: '-',
            assigned: '-',
            lastestBy: '-',
          };
          this.phoneInfo = phoneInfo;
        }
        this.loading = false;
        this.responeLoading = false;
        this.showInfo = true;
      },
      (error) => {
        console.error('Error sending data:', error);
        // Handle error if needed
        this.loading = false;
      }
    );
  }

  showBlockDetail(data:any){
    this.router.navigateByUrl('/block/search/info?info='+data);
  }

  showAssignedDetail(data:any){
    this.router.navigateByUrl('/assign/search/info?info='+data);
  }

  valid() {
    let error: any = this.phoneForm.get('phoneInfo')?.errors;
    console.log(error.pattern);
    return error.pattern;
  }

  required() {
    let error: any = this.phoneForm.get('phoneInfo')?.errors;
    console.log(error.required);
    return error.required;
  }
}
