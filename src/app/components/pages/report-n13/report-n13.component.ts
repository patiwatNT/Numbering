import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { ReportN13 } from '../../../models/reportN13';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-report-n13',
  standalone: true,
  imports: [CommonModule,SkeletonModule],
  templateUrl: './report-n13.component.html',
  styleUrl: './report-n13.component.scss'
})
export class ReportN13Component implements OnInit{
  reportN13List:any[] = [];
  sumNumberAmountAll:string = '';
  sumNumberAmountAssigned:string = '';
  sumNumberAmountActive:string = '';
  loading:boolean = false;
  ngOnInit(): void {
    this.sendData();
  }
  constructor(private backendService:BackendService){}

  sendData(){
    this.loading = true;
    this.backendService.findAllReportN13().subscribe(
      (response)=>{
        console.log("Get Response Succes :",response);
        this.reportN13List = response;
        //this.updatePagedData(0);

        // Add Comma in Sum Section
        const sumNumberAmountAll = this.reportN13List.reduce((acc, curr) => acc + curr.qtyNo,0);
        const sumNumberAmountAssigned = this.reportN13List.reduce((acc, curr) => acc + curr.qtyAssigned,0);
        const sumNumberAmountActive = this.reportN13List.reduce((acc, curr) => acc + curr.qtyActive,0);
        this.sumNumberAmountAll = this.addComma(sumNumberAmountAll);
        this.sumNumberAmountAssigned = this.addComma(sumNumberAmountAssigned);
        this.sumNumberAmountActive = this.addComma(sumNumberAmountActive);

        // Add Comma to Value in BlockList
        this.reportN13List = response.map((item:ReportN13) => ({
          ...item,
          qtyNo: this.addComma(item.qtyNo),
          qtyAssigned: this.addComma(item.qtyAssigned),
          qtyActive: this.addComma(item.qtyActive),
          }));
          this.loading = false;
        
      },
      (error)=>{
        console.log("Error : ",error);
      }
    )
  }

  // Add , in Number
  addComma(data: any) {
    let temp = Number(data).toFixed(0);
    
    temp = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return temp;
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
}
