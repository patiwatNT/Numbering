import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-report-n16',
  standalone: true,
  imports: [CommonModule,ButtonModule,SkeletonModule],
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
  constructor(private backendService:BackendService,private router:Router){}
  ngOnInit(): void {
    this.sendData();
  }
  sendData(){
    this.loading = true;
    this.backendService.findAllReportN16Inc().subscribe(
      (response)=>{
        console.log("Get Response Success : ",response);
        this.reportN16IncList = response


        // Add Comma in Sum Section
        const sumNumberAmount = this.reportN16IncList.reduce((acc, curr) => acc + curr.qty,0);
        const sumMonthlyFee = this.reportN16IncList.reduce((acc, curr) => acc + curr.amt,0);
        const sumAnnualFee = this.reportN16IncList.reduce((acc, curr) => acc + curr.amtYearly,0);
        this.sumNumberAmount = this.addComma(sumNumberAmount);
        this.sumMonthlyFee = this.addCommaDecimal(sumMonthlyFee);
        this.sumAnnualFee = this.addCommaDecimal(sumAnnualFee);

        // Add Comma to Value in BlockList
        this.reportN16IncList = this.reportN16IncList.map((item:any) => ({
          ...item,
          qtyRange: this.addComma(item.qtyRange),
          qty: this.addComma(item.qty),
          amt: this.addCommaDecimal(item.amt),
          amtYearly: this.addCommaDecimal(item.amtYearly),
          }));
          this.loading = false;
      },
      (error)=>{
        console.log("Error : ",error);
      }
    )

    this.backendService.findAllReportN16Only().subscribe(
      (response)=>{
        console.log("Get Response Success : ",response);
        this.reportN16OnlyList = response


        // Add Comma in Sum Section
        const sumNumberAmount = this.reportN16OnlyList.reduce((acc, curr) => acc + curr.qty,0);
        const sumMonthlyFee = this.reportN16OnlyList.reduce((acc, curr) => acc + curr.amt,0);
        const sumAnnualFee = this.reportN16OnlyList.reduce((acc, curr) => acc + curr.amtYearly,0);
        this.sumNumberAmount = this.addComma(sumNumberAmount);
        this.sumMonthlyFee = this.addCommaDecimal(sumMonthlyFee);
        this.sumAnnualFee = this.addCommaDecimal(sumAnnualFee);

        // Add Comma to Value in BlockList
        this.reportN16OnlyList = this.reportN16OnlyList.map((item:any) => ({
          ...item,
          qtyRange: this.addComma(item.qtyRange),
          qty: this.addComma(item.qty),
          amt: this.addCommaDecimal(item.amt),
          amtYearly: this.addCommaDecimal(item.amtYearly),
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
  addCommaDecimal(data: any) {
    let temp = Number(data).toFixed(2);
    
    temp = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return temp;
  }

  showReportN16Detail(block:string,blockAmount:string){
    this.router.navigateByUrl('report/N-16/detail?block='+block+'&blockAmount='+blockAmount);
  }
}
