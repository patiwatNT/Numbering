import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { ReportN13 } from '../../../models/reportN13';

@Component({
  selector: 'app-report-n13',
  standalone: true,
  imports: [CommonModule],
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
    this.backendService.findAllReportN13().subscribe(
      (response)=>{
        console.log("Get Response Succes :",response);
        this.reportN13List = response;
        //this.updatePagedData(0);

        // Add Comma in Sum Section
        const sumNumberAmountAll = this.reportN13List.reduce((acc, curr) => acc + curr.numberAmountAll,0);
        const sumNumberAmountAssigned = this.reportN13List.reduce((acc, curr) => acc + curr.numberAmountAssigned,0);
        const sumNumberAmountActive = this.reportN13List.reduce((acc, curr) => acc + curr.numberAmountActive,0);
        this.sumNumberAmountAll = this.addComma(sumNumberAmountAll);
        this.sumNumberAmountAssigned = this.addComma(sumNumberAmountAssigned);
        this.sumNumberAmountActive = this.addComma(sumNumberAmountActive);

        // Add Comma to Value in BlockList
        this.reportN13List = response.map((item:ReportN13) => ({
          ...item,
          numberAmountAll: this.addComma(item.numberAmountAll),
          numberAmountAssigned: this.addComma(item.numberAmountAssigned),
          sumNumberAmountActive: this.addComma(item.numberAmountActive),
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
    if(data==='ST001'){
      return 'ยังใช้งาน'
    }else if(data==='ST002'){
      return 'คืน กสทช. แล้ว'
    }else if(data==='ST003'){
      return 'อยู่ระหว่างดำเนินการคืน กสทช'
    }else{
      return data;
    }
  }
}
