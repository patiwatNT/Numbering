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
import moment from 'moment';
import { BlobOptions } from 'buffer';

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
  phoneSearch: string = ""
  serviceCenter:any = {};
  provider:any = {};
  assigned:any = {};
  block:any = {};
  crmAsset:any = {};
  notFound:boolean = false;
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
      this.loading = true;
      this.responeLoading = true;
      const currentUrl = window.location.href;
      const phoneInfo = currentUrl.slice(currentUrl.indexOf('=')+1);
      this.backendService.findPhoneInfoById(phoneInfo).subscribe(
        (response) => {
          console.log('Data sent successfully:', response);
          if (response != null) {
            this.phoneInfo = response;
            this.phoneSearch = response.serviceNo
            this.findLocationCode(response.locationCode);
            this.findProvider(response.providerId);
            this.findAssgined(response.assignedId);
            this.findBlock(response.blockId);
            this.showInfo = true;
            this.notFound = false;
          } else {
            this.notFound = true;
            this.showInfo = false;
          }
          this.loading = false;
          this.responeLoading = false;
          
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

  sendDataToBackend(form: FormGroup) {
    this.loading = true;
    this.responeLoading = true;
    console.log(form.value.phoneInfo);
    this.backendService.findPhoneInfoById(form.value.phoneInfo).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
        if (response != null) {
          this.phoneInfo = response;
          this.findLocationCode(response.locationCode);
          this.findProvider(response.providerId);
          this.findAssgined(response.assignedId);
          this.findBlock(response.blockId);
          this.findCrmStatus(response.serviceNo)
          this.showInfo = true;
          this.notFound = false;
        } else {
          this.notFound = true;
          this.showInfo = false;
        }
        this.loading = false;
        this.responeLoading = false;
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

  findLocationCode(locationCode:string){
    this.backendService.findLocationCode(locationCode).subscribe(
      (response)=>{
        console.log("Get Location Success :",response);
        this.serviceCenter = response;
      },
      (error)=>{
        console.log("Error",error);
      }
    )
  }

  findProvider(providerId:string){
    this.backendService.findProviderById(providerId).subscribe(
      (response)=>{
        console.log("Get Provider Success :",response);
        this.provider = response;
      },
      (error)=>{
        console.log("Error",error);
      }
    )
  }

  findAssgined(assignedId:string){
    this.backendService.findAssignedById(assignedId).subscribe(
      (response)=>{
        console.log("Get Assgined Success :",response);
        this.assigned = response;
      },
      (error)=>{
        console.log("Error",error);
      }
    )
  }

  findBlock(blockId:number){
    this.backendService.findBlockById(blockId).subscribe(
      (response)=>{
        console.log("Get Block Success :",response);
        this.block = response;
      },
      (error)=>{
        console.log("Error",error);
      }
    )
  }

  findCrmStatus(telNo:string){
    this.backendService.findCrmStatus(telNo).subscribe(
      (response)=>{
        console.log("Get Crm Status Success :",response);
        this.crmAsset = response;
      },
      (error)=>{
        console.log("Error",error);
      }
    )
  }

  convertDate(data:any){
    return moment(data).format('DD/MM/YYYY');
  }

}
