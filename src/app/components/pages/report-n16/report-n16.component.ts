import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report-n16',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-n16.component.html',
  styleUrl: './report-n16.component.scss'
})
export class ReportN16Component implements OnInit{
  reportN16List:any[] = [];
  reportN16IncList:any[] = [];
  reportN16OnlyList:any[] = [];
  loading:boolean = false;
  sumNumberAmount:string = '';
  sumMonthlyFee:string = '';
  sumAnnualFee:string = '';
  constructor(private backendService:BackendService){}
  ngOnInit(): void {
    this.sendData();
  }
  sendData(){
    this.backendService.findAllReportN16().subscribe(
      (response)=>{
        console.log("Get Response Success : ",response);
        this.reportN16List = response;
        this.reportN16IncList.push(this.reportN16List[0]);
        this.reportN16OnlyList.push(this.reportN16List[0]);
        for(let i of this.reportN16List){
          if(i.block.includes('INC')){
            this.reportN16IncList.push(i);
          }else if(i.block.includes('ONLY')){
            this.reportN16OnlyList.push(i);
          }
        }

        // Add Comma in Sum Section
        const sumNumberAmount = this.reportN16OnlyList.reduce((acc, curr) => acc + curr.numberAmount,0);
        const sumMonthlyFee = this.reportN16OnlyList.reduce((acc, curr) => acc + curr.monthlyFee,0);
        const sumAnnualFee = this.reportN16OnlyList.reduce((acc, curr) => acc + curr.annualFee,0);
        this.sumNumberAmount = this.addComma(sumNumberAmount);
        this.sumMonthlyFee = this.addComma(sumMonthlyFee);
        this.sumAnnualFee = this.addComma(sumAnnualFee);

        // Add Comma to Value in BlockList
        this.reportN16OnlyList = this.reportN16OnlyList.map((item:any) => ({
          ...item,
          numberAmount: this.addComma(item.numberAmount),
          monthlyFee: this.addComma(item.monthlyFee),
          annualFee: this.addComma(item.annualFee),
        }));
        this.reportN16IncList = this.reportN16IncList.map((item:any) => ({
          ...item,
          numberAmount: this.addComma(item.numberAmount),
          monthlyFee: this.addComma(item.monthlyFee),
          annualFee: this.addComma(item.annualFee),
          }));
          this.loading = false;
      },
      (error)=>{
        console.log("Error : ",error);
      }
    )
  }
  addComma(data: any) {
    let temp = Number(data).toFixed(0);
    
    temp = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return temp;
  }
}
