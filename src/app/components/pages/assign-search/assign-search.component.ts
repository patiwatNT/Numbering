import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { BackendService } from '../../../services/BackendService';
import { DropDownData } from '../../../models/dropdownData';
import { CommonModule } from '@angular/common';
import { AssignedRangeDtoC } from './../../../models/assignedRangeDtoC';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assign-search',
  standalone: true,
  imports: [
    InputTextModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PaginatorModule,
    SkeletonModule,
    DialogModule
  ],
  templateUrl: './assign-search.component.html',
  styleUrl: './assign-search.component.scss',
})
export class AssignSearchComponent implements OnInit {
  assignedForm!: FormGroup;
  loading: boolean = false;
  first: number = 0;
  rows: number = 5;
  pagedData: any[] = [];
  assignedRangeList: any[] = [];
  assignedRangeDetail: any = {};
  visible:boolean = false;
  detailLoading:boolean = false;
  responseLoading:boolean = false;
  init:boolean = false;
  assignSearch:string = "";
  provider: DropDownData[] = [
    {
      name: 'ทั้งหมด',
      value: '',
    },
  ];
  division: DropDownData[] = [
    {
      name: 'ทั้งหมด',
      value: '',
    },
  ];
  location: DropDownData[] = [
    {
      name: 'ทั้งหมด',
      value: '',
    },
  ];
  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {
    this.assignedForm = this.formBuilder.group({
      phoneInfo: ['', [Validators.pattern('^[0-9]*$')]],
      provider: new FormControl<DropDownData | null>({
        name: 'ทั้งหมด',
        value: '',
      }),
      division: new FormControl<DropDownData | null>({
        name: 'ทั้งหมด',
        value: '',
      }),
      location: new FormControl<DropDownData | null>({
        name: 'ทั้งหมด',
        value: '',
      }),
      blockId: ['', [Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnInit(): void {
    if (this.router.url.includes('/assignData')||this.router.url.includes('/info')) {
      this.init = true;
      this.getData();
    }
    // console.log("Block Detail list : ",this.blockDetailList);
    this.backendService.findAllBlock().subscribe(
      (response) => {
        console.log('Provider Repsponse', response);
        for (let i of response) {
          this.provider.push({
            name: i.provide,
            value: i.provide,
          });
        }
      },
      (error) => {
        console.log('Error Repsonse', error);
      }
    );
    this.backendService.findNumberingLocation().subscribe(
      (response) => {
        console.log('Location Reposnse Success', response);
        for (let i of response) {
          this.location.push({
            name: i.name,
            value: i.value,
          });
        }
      },
      (error) => {
        console.log('Reposnse Error ', error);
      }
    );
    this.backendService.findAllDivision().subscribe(
      (response) => {
        console.log('Division Response Success ', response);
        for (let i of response) {
          this.division.push({
            name: i.name,
            value: i.id,
          });
        }
      },
      (error) => {
        console.log('Error Response ', error);
      }
    );
  }

  getData(){
    this.loading = true;
    const currentUrl = window.location.href;
    const phoneInfo = currentUrl.slice(currentUrl.indexOf('=')+1);
    let data = {"phoneInfo":phoneInfo}
    this.backendService.findAssignedRange(data).subscribe(
      (response)=>{
        console.log("Success",response);
        this.assignedRangeList = response;
        this.assignSearch = data.phoneInfo
        this.updatePagedData(0);
        this.loading = false;
        this.responseLoading = true;
        console.log(this.assignedRangeList.length);
      },
      (error)=> {
        console.log("Error",error);
      }
    )
  }

  search(form: any) {
    console.log(form.value);
    if (!form.invalid) {
      this.sendDataToBackend(form);
    }
  }

  sendDataToBackend(form: FormGroup) {
    this.loading = true;
    let assignedRangeDtoC: AssignedRangeDtoC = {
      phoneInfo: form.value.phoneInfo,
      provider: form.value.provider.value,
      division: form.value.division.value,
      location: form.value.location.value,
      blockId: form.value.blockId,
    };
    this.backendService.findAssignedRange(assignedRangeDtoC).subscribe(
      (response) => {
        console.log('Get Response Success', response);
        this.assignSearch = assignedRangeDtoC.phoneInfo;
        this.assignedRangeList = response;
        this.updatePagedData(0);
        this.loading = false;
        this.responseLoading = true;
      },
      (error) => {
        console.log('Error Response', error);
      }
    );
  }

  valid(formControlName: string) {
    let error: any = this.assignedForm.get(formControlName)?.errors;
    console.log(error.pattern);
    return error.pattern;
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
    this.pagedData = this.assignedRangeList.slice(startIndex, endIndex);
    console.log(this.pagedData);
  }

  showDialog(id:string) {
    console.log("show Dialog");
    this.visible = true;
    this.detailLoading = true;
    this.backendService.findAssignedRangeDetail(id).subscribe(
      (reponse)=>{
        console.log("Success : ",reponse);
        this.assignedRangeDetail = reponse;
        this.detailLoading = false;
      },
      (error)=>{
        console.log("Failed : ",error);
      }
    )
  }

  changeServiceLocation(phoneInfo:string,assignRangeId:string){
    console.log("change Service Location");
    console.log(phoneInfo,assignRangeId);
    this.router.navigateByUrl('/changeServiceLocation?assignRangeId='+assignRangeId);
  }
}
