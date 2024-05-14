import { Component,OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectItemGroup,ConfirmationService } from 'primeng/api';
import {
  FormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { ExcelService } from '../../../services/excel.service';
import { ExcelAssignedObj } from '../../../models/excelAssignedObj';

@Component({
  selector: 'app-change-service-location',
  standalone: true,
  imports: [ButtonModule,CommonModule,PaginatorModule,DialogModule,SkeletonModule,DropdownModule,ReactiveFormsModule,FormsModule,ConfirmDialogModule,SkeletonModule],
  templateUrl: './change-service-location.component.html',
  styleUrl: './change-service-location.component.scss',
  providers: [ConfirmationService,ExcelService],
})


export class ChangeServiceLocationComponent implements OnInit{
  phoneInfo:any = {}
  phoneDetailList:any[] = []
  first: number = 0;
  rows: number = 5;
  totalPage: number = 0;
  pagedData: any[] = [];
  visible:boolean = false;
  detailLoading:boolean = false;
  changeSeviceLocationForm! : FormGroup 
  selectedLocation: string | undefined;
  serviceLocation: SelectItemGroup[] = [];
  temp: any = {};
  assignRangeId:string = "";
  excelObj:ExcelAssignedObj = {assignObj:{},listPhoneDetail:[]}
  loading:boolean = false;
  constructor(
    private backendService: BackendService,
    private router: Router,
    private confirmationService : ConfirmationService,
    private activeRoute : ActivatedRoute,
    private excelService: ExcelService
  ){
  }
  

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params=>{
      this.assignRangeId  = params['assignRangeId'];
    })
    this.loading = true;
    this.backendService.findAssignedById(this.assignRangeId).subscribe(
      (response)=>{
        console.log('Get Response Success',response);
        this.phoneInfo = response
        this.excelObj.assignObj = response;
      },
      (error)=>{
        console.log('Error',error);
      }
    )
    this.backendService.findAssignedRangeDetail(this.assignRangeId).subscribe(
      (reponse)=>{
        console.log('Get Response Success',reponse);
        this.phoneDetailList = reponse;
        this.excelObj.listPhoneDetail = reponse;
        this.updatePagedData(0)
        this.loading = false;
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
    this.totalPage = Math.ceil(this.phoneDetailList.length/this.rows);
    console.log(this.pagedData);
  }

  showPhoneInfo(data:any){
    console.log('show phone info');
    this.router.navigateByUrl("/phone?search="+data)
  }

  convertDate(data:any){
    return moment(data).format('DD/MM/YYYY');
  }

  changeServiceLocation(data:any){
    console.log('change service location');
    this.temp = data;
    console.log(this.temp);
    this.visible = true;
    this.backendService.findServiceLocation().subscribe(
      (response)=>{
        console.log("Get Response Success",response);
        this.serviceLocation = response;
        this.selectedLocation = this.temp.locationCode.slice(0,this.temp.locationCode.lastIndexOf(':'));
        console.log(this.selectedLocation);
      },
      (error)=>{
        console.log("Error",error);
      }
    )
    //this.detailLoading = true;
    this.detailLoading = false;
  }
  Confirm(data:string) {
    this.confirmationService.confirm({
      header: 'ยืนยันการแก้ไข Service Location',
      icon: 'pi pi-exclamation-triangle',
      message: 'คุณยืนยันที่จะทำการแก้ไข Service Location ของ หมายเลข '+data,
      acceptLabel: 'ยืนยัน',
      rejectLabel: 'ยกเลิก',
      rejectButtonStyleClass: 'confirm-dialog-reject-style',
      accept: () => {
        console.log('ยืนยันการเพิ่มข่าว');
        console.log(this.selectedLocation);
        let phoneDetailDto:any = {}
        phoneDetailDto = {"serviceNo":data,"locationCode":this.selectedLocation}
        console.log(phoneDetailDto);
        this.backendService.updateServiceLocation(phoneDetailDto).subscribe(
          (response)=>{
            console.log("Get Response Success",response);
          },
          (error)=>{
            console.log("Error",error);
          }
        )
        window.location.reload();
      },
    });
  }

  Close() {
    this.confirmationService.confirm({
      header: 'ยกเลิกการเพิ่มข่าวประชาสัมพันธ์',
      icon: 'pi pi-exclamation-triangle',
      message: 'การยกเลิกจยุติขั้นตอนที่คุณกำลังดำเนินการอยู่',
      acceptLabel: 'ยืนยัน',
      rejectLabel: 'ยกเลิก',
      rejectButtonStyleClass: 'confirm-dialog-reject-style',
      accept: () => {
        console.log('ยกเลิกการเพิ่มข่าว');
        this.router.navigateByUrl('/main');
      },
    });
  }

  exportExcel(){
    this.excelService.generateExcelAssignRange('TestTemp',this.excelObj);
  }
}
