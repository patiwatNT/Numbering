import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-report-n15',
  standalone: true,
  imports: [CommonModule,SkeletonModule],
  templateUrl: './report-n15.component.html',
  styleUrl: './report-n15.component.scss'
})
export class ReportN15Component implements OnInit{
  constructor(private backendService:BackendService) { 
  }
  reportN15List:any[] = [];
  sumNumberAmountAssigned:string = '';
  sumNumberAmountActive:string = '';
  sumNumberAmountAvailable:string = '';
  loading:boolean = false;
  ngOnInit(): void {
    this.sendData();
  }

  sendData(){
    this.loading = true;
    this.backendService.findAllReportN15().subscribe(
      (response)=>{
        console.log("Get Response Success : ",response);
        this.reportN15List = response;

        // Add Comma in Sum Section
        const sumNumberAmountAssigned = this.reportN15List.reduce((acc, curr) => acc + curr.qtyAssigned,0);
        const sumNumberAmountActive = this.reportN15List.reduce((acc, curr) => acc + curr.qtyActive,0);
        const sumNumberAmountAvailable = this.reportN15List.reduce((acc, curr) => acc + curr.qtyEmpty,0);
        this.sumNumberAmountAssigned = this.addComma(sumNumberAmountAssigned);
        this.sumNumberAmountActive = this.addComma(sumNumberAmountActive);
        this.sumNumberAmountAvailable = this.addComma(sumNumberAmountAvailable);

        // Add Comma to Value in BlockList
        this.reportN15List = response.map((item:any) => ({
          ...item,
          qtyAssigned: this.addComma(item.qtyAssigned),
          qtyActive: this.addComma(item.qtyActive),
          qtyEmpty: this.addComma(item.qtyEmpty),
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
  addCommaDecimal(data: any) {
    let temp = Number(data).toFixed(2);
    
    temp = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return temp;
  }

  utilization(assigned:any,active:any):any{
    const temp1  = parseInt(assigned.replace(',',''));
    const temp2 = parseInt(active.replace(',',''));
    console.log(temp1,temp2);
    let result = (temp2/temp1) * 100 
    return this.addComma(result);
  }
}
