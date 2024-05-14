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
import { CookieService } from 'ngx-cookie-service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { da } from '../../../../../dist/numbering-frontend/browser/chunk-5RWOEKIM';

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
    DialogModule,
    ConfirmDialogModule
  ],
  templateUrl: './assign-search.component.html',
  styleUrl: './assign-search.component.scss',
  providers: [ConfirmationService],
})
export class AssignSearchComponent implements OnInit {
  assignedForm!: FormGroup;
  editAssignedForm!: FormGroup;
  loading: boolean = false;
  first: number = 0;
  rows: number = 5;
  pagedData: any[] = [];
  assignedRangeList: any[] = [];
  assignedAmount: any[] =[];
  adminFlag :string = '';
  assignedRangeDetail: any = {};
  visible: boolean = false;
  editAssignedVisible: boolean = false;
  username:string = this.cookies.get('user');
  detailLoading: boolean = false;
  responseLoading: boolean = false;
  init: boolean = false;
  phoneInfo: string = '';
  assignedValue!: number;
  placeHolderValue: string = '';
  blockId: string = '';
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
    private router: Router,
    private cookies:CookieService,
    private confirmationService: ConfirmationService
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
    this.editAssignedForm = this.formBuilder.group({
      assignedValue: [''],
    });

  }

  ngOnInit(): void {
    this.adminFlag = this.cookies.get('adminFlag');
    if (
      this.router.url.includes('/assignData') ||
      this.router.url.includes('/info')
    ) {
      this.init = true;
      this.getData();
    }
    // console.log("Block Detail list : ",this.blockDetailList);
    this.backendService.findAllProvider().subscribe(
      (response) => {
        console.log('Provider Repsponse', response);
        response.splice(4, 2);
        for (let i of response) {
          this.provider.push({
            name: i.providerName,
            value: i.providerId,
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
          if (i != null) {
            this.location.push({
              name: i,
              value: i,
            });
          }
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
          if (i != null) {
            this.division.push({
              name: i,
              value: i,
            });
          }
        }
      },
      (error) => {
        console.log('Error Response ', error);
      }
    );
  }

  getData() {
    this.loading = true;
    const currentUrl = window.location.href;
    const blockId = currentUrl.slice(currentUrl.indexOf('=') + 1);
    let data = { blockId: blockId };
    this.backendService.findAssignedRange(data).subscribe(
      (response) => {
        console.log('Success', response);
        this.assignedRangeList = response;
        this.blockId = data.blockId;
        this.updatePagedData(0);
        this.loading = false;
        this.responseLoading = true;
        console.log(this.assignedRangeList.length);
      },
      (error) => {
        console.log('Error', error);
      }
    );
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
        this.phoneInfo = assignedRangeDtoC.phoneInfo;
        this.assignedRangeList = response;
        this.backendService.findAssignedAmount(assignedRangeDtoC).subscribe(
          (response) => {
            console.log('Response Success : ', response);
            this.assignedAmount = response;
            let i = 0;
            this.assignedRangeList.forEach((item) => {
              // Add additional fields to 'item' as needed
              item.okLocation = this.assignedAmount[i].okLocation; // Example: Adding a new field 'additionalField' with a value 'value'
              item.noLocation = this.assignedAmount[i].noLocation
              i++;
            });
            this.loading = false;
        this.responseLoading = true;
          },
          (error) => {
            console.log('Error :', error);
          }
        );
        this.updatePagedData(0);
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

  showDialog(id: string) {
    console.log('show Dialog');
    this.visible = true;
    this.detailLoading = true;
    this.backendService.findAssignedById(id).subscribe(
      (reponse) => {
        console.log('Success : ', reponse);
        this.assignedRangeDetail = reponse;
        this.detailLoading = false;
      },
      (error) => {
        console.log('Failed : ', error);
      }
    );
  }

  editAssigned(data: any) {
    console.log(data);
    this.editAssignedVisible = true;
    this.placeHolderValue = data.assignedQty;
    // this.detailLoading = true;
    // this.backendService.findAssignedById(id).subscribe(
    //   (reponse) => {
    //     console.log('Success : ', reponse);
    //     this.assignedRangeDetail = reponse;
    //     this.detailLoading = false;
    //   },
    //   (error) => {
    //     console.log('Failed : ', error);
    //   }
    // );
  }

  changeServiceLocation(phoneInfo: string, assignRangeId: string) {
    console.log('change Service Location');
    console.log(phoneInfo, assignRangeId);
    this.router.navigateByUrl(
      '/changeServiceLocation?assignRangeId=' + assignRangeId
    );
  }
  Confirm(data:number) {
    this.confirmationService.confirm({
      header: 'ยืนยันการแก้ไขเลขหมาย',
      icon: 'pi pi-exclamation-triangle',
      message: 'คุณยืนยันที่จะทำการแก้ไขจำนวนเลขหมายที่พร้อมให้บริการ '+data,
      acceptLabel: 'ยืนยัน',
      rejectLabel: 'ยกเลิก',
      rejectButtonStyleClass: 'confirm-dialog-reject-style',
      accept: () => {
        console.log(data);
        // let phoneDetailDto:any = {}
        // phoneDetailDto = {"serviceNo":data,"locationCode":this.selectedLocation}
        // console.log(phoneDetailDto);
        // this.backendService.updateServiceLocation(phoneDetailDto).subscribe(
        //   (response)=>{
        //     console.log("Get Response Success",response);
        //   },
        //   (error)=>{
        //     console.log("Error",error);
        //   }
        // )
        // window.location.reload();
      },
    });
  }
}
