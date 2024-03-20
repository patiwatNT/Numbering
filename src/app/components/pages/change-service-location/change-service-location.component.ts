import { Component,OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DropDownData } from '../../../models/dropdownData';
import { SelectItemGroup } from 'primeng/api';
import {
  FormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-change-service-location',
  standalone: true,
  imports: [ButtonModule,CommonModule,PaginatorModule,DialogModule,SkeletonModule,DropdownModule,ReactiveFormsModule,FormsModule],
  templateUrl: './change-service-location.component.html',
  styleUrl: './change-service-location.component.scss',
})
export class ChangeServiceLocationComponent implements OnInit{
  phoneInfo:any = {}
  phoneDetailList:any[] = []
  first: number = 0;
  rows: number = 5;
  pagedData: any[] = [];
  visible:boolean = false;
  detailLoading:boolean = false;
  changeSeviceLocationForm! : FormGroup 
  selectedLocation: string = 'First';
  serviceLocation: SelectItemGroup[] = [
    {
      label: 'ทั้งหมด',
      value: '',
      items: [
        { label: 'Berlin', value: 'Berlin' },
        { label: 'Frankfurt', value: 'Frankfurt' },
        { label: 'Hamburg', value: 'Hamburg' },
        { label: 'Munich', value: 'Munich' }
    ]
    },
    {
      label: 'Active',
      value: 'ST001',
      items: [
        { label: 'First', value: 'First' },
        { label: 'Frankfurt', value: 'Frankfurt' },
        { label: 'Hamburg', value: 'Hamburg' },
        { label: 'Munich', value: 'Munich' }
    ]
    },
    {
      label: 'Inactive',
      value: 'ST002',
      items: [
        { label: 'Second', value: 'Second' },
        { label: 'Frankfurt', value: 'Frankfurt' },
        { label: 'Hamburg', value: 'Hamburg' },
        { label: 'Munich', value: 'Munich' }
    ]
    },
  ];
  constructor(
    private backendService: BackendService,
    private router: Router,
    private formBuilder: FormBuilder,
  ){
  }

  ngOnInit(): void {
    const currentUrl = window.location.href;
    const assignRangeId = currentUrl.slice(currentUrl.indexOf('=')+1);
    this.backendService.findAssignedRangeDetail(assignRangeId).subscribe(
      (response)=>{
        console.log('Get Response Success',response);
        this.phoneInfo = response
      },
      (error)=>{
        console.log('Error',error);
      }
    )
    this.backendService.findPhoneDetail(assignRangeId).subscribe(
      (reponse)=>{
        console.log('Get Response Success',reponse);
        this.phoneDetailList = reponse;
        this.updatePagedData(0)
      },
      (error)=>{
        console.log('Error',error);
      }
    )
  }

  onPageChange(event: any) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    this.updatePagedData(event.page);
  }

  updatePagedData(pageIndex: number) {
    const startIndex = pageIndex * this.rows;
    console.log(startIndex);
    const endIndex = startIndex + this.rows;
    console.log(endIndex);
    this.pagedData = this.phoneDetailList.slice(startIndex, endIndex);
    console.log(this.pagedData);
  }

  showPhoneInfo(data:any){
    console.log('show phone info');
    this.router.navigateByUrl("/phone?search="+data)
  }

  changeServiceLocation(){
    console.log('change service location');
    this.visible = true;
    //this.detailLoading = true;
    this.detailLoading = false;
  }
}
