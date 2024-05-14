import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ReportN12 } from '../../../models/reportN12';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-report-n12',
  standalone: true,
  imports: [CommonModule,PaginatorModule,SkeletonModule],
  templateUrl: './report-n12.component.html',
  styleUrl: './report-n12.component.scss'
})
export class ReportN12Component implements OnInit{
  reportN12List:any[] = [];
  first: number = 0;
  rows: number = 5;
  totalPage: number = 0;
  pagedData: any[] = [];
  sumNumberAmountAll:string = '';
  sumNumberAmountAssigned:string = '';
  sumNumberAmountActive:string = '';
  loading:boolean = false;
  constructor(private backendService:BackendService) {
  }

  ngOnInit(): void {
    this.sendData();
  }

  sendData(){
    this.loading = true;
    this.backendService.findAllReportN12().subscribe(
      (response)=>{
        console.log("Get Response Succes :",response);
        this.reportN12List = response;
        //this.updatePagedData(0);

        // Add Comma in Sum Section
        const sumNumberAmountAll = this.reportN12List.reduce((acc, curr) => acc + curr.qtyNo,0);
        const sumNumberAmountAssigned = this.reportN12List.reduce((acc, curr) => acc + curr.qtyAssigned,0);
        //const sumNumberAmountActive = this.reportN12List.reduce((acc, curr) => acc + curr.numberAmountActive,0);
        this.sumNumberAmountAll = this.addComma(sumNumberAmountAll);
        this.sumNumberAmountAssigned = this.addComma(sumNumberAmountAssigned);
        //this.sumNumberAmountActive = this.addComma(sumNumberAmountActive);

        // Add Comma to Value in BlockList
        this.reportN12List = response.map((item:ReportN12) => ({
          ...item,
          qtyNo: this.addComma(item.qtyNo),
          qtyAssigned: this.addComma(item.qtyAssigned),
          //sumNumberAmountActive: this.addComma(item.numberAmountActive),
          }));
          this.loading = false;
        
      },
      (error)=>{
        console.log("Error : ",error);
      }
    )
  }

  replaceStatus(data:any):string{
    if(data==1){
      return 'ใช้งาน'
    }else if(data==0){
      return 'คืน กสทช. แล้ว'
    }else if(data==2){
      return 'อยู่ระหว่างดำเนินการคืน กสทช'
    }else{
      return data;
    }
  }

  // Function Paginator
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
    this.pagedData = this.reportN12List.slice(startIndex, endIndex);
    console.log(this.pagedData);
  }

  // Add , in Number
  addComma(data: any) {
    let temp = Number(data).toFixed(0);
    
    temp = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return temp;
  }
}
