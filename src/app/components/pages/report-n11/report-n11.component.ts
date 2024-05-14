import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { reportN11Active } from '../../../models/reportN11Active';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { reportN11InactiveAndInProgress } from '../../../models/reportN11InactiveAndInProgress';

@Component({
  selector: 'app-report-n11',
  standalone: true,
  imports: [CommonModule,ButtonModule,SkeletonModule],
  templateUrl: './report-n11.component.html',
  styleUrl: './report-n11.component.scss'
})
export class ReportN11Component implements OnInit{
  constructor(private backendService:BackendService,private router:Router){}
  reportN11ActiveList:any[] = [];
  reportN11InactiveList:any[] = [];
  reportN11InprogressList:any[] = [];
  activeIndex:number = 0;
  inprogressIndex:number = 0;
  inactiveIndex:number = 0;
  sumBlockAmountActive:string = "";
  sumNumberAmountAllActive:string = "";
  sumFeeAmountActive:string = "";
  sumNumberAmountAssigned:string = "";
  sumNumberAmountAssignedActive:string = "";
  sumNumberAmountNotAssigned:string = "";
  loading:boolean = false;
  sumBlockAmountInactive:string = "";
  sumNumberAmountAllInactive:string = "";
  sumFeeAmountInactive:string = "";
  sumBlockAmountInProgress:string = "";
  sumNumberAmountAllInProgress:string = "";
  sumFeeAmountInProgress:string = "";
  ngOnInit(): void {
    this.sendData();
  }

  sendData(){
    this.loading = true;
    this.backendService.findReportN11Active().subscribe(
      (response)=>{
        console.log("Get Reponse Success Active:",response);
        this.reportN11ActiveList = response;
        this.loading = false;
        console.log("loading : ",this.loading);
        // for(let i of this.reportN11List){
        //   if(i.blockStatus==='ยังใช้งาน'){
        //     this.activeIndex++;
        //   }
        //   if(i.blockStatus==='คืน กสทช. แล้ว'){
        //     this.inactiveIndex++;
        //   }
        //   if(i.blockStatus==='อยู่ระหว่างดำเนินการคืน กสทช.'){
        //     this.inprogressIndex++;
        //   }
        // }

        // Add Comma in Sum Section
        const sumBlockAmountActive = this.reportN11ActiveList.reduce((acc, curr) => acc + curr.qtyBlock,0);
        const sumNumberAmountAllActive = this.reportN11ActiveList.reduce((acc, curr) => acc + curr.qtyNo,0);
        const sumNumberAmountAssigned = this.reportN11ActiveList.reduce((acc, curr) => acc + curr.qtyAssigned,0);
        const sumNumberAmountAssignedActive = this.reportN11ActiveList.reduce((acc, curr) => acc + curr.qtyActive,0);
        const sumNumberAmountNotAssigned = this.reportN11ActiveList.reduce((acc, curr) => acc + curr.qtyActiveAssigned,0);
        const sumFeeAmountActive = this.reportN11ActiveList.reduce((acc, curr) => acc + curr.qtyPay,0);
        this.sumBlockAmountActive = this.addComma(sumBlockAmountActive);
        this.sumNumberAmountAllActive = this.addComma(sumNumberAmountAllActive);
        this.sumNumberAmountAssigned = this.addComma(sumNumberAmountAssigned);
        this.sumNumberAmountAssignedActive = this.addComma(sumNumberAmountAssignedActive);
        this.sumNumberAmountNotAssigned = this.addComma(sumNumberAmountNotAssigned);
        this.sumFeeAmountActive = this.addCommaFee(sumFeeAmountActive);

        // Add Comma to Value in BlockList
        this.reportN11ActiveList = response.map((item:reportN11Active) => ({
          ...item,
          qtyBlock: this.addComma(item.qtyBlock),
          qtyNo: this.addComma(item.qtyNo),
          qtyAssigned: this.addComma(item.qtyAssigned),
          qtyActive: this.addComma(item.qtyActive),
          qtyActiveAssigned: this.addComma(item.qtyActiveAssigned),
          qtyPay: this.addCommaFee(item.qtyPay)
          }));
          this.loading = false;
      },
      (error)=>{
        console.log("Error : ",error);
      }
    )
    this.backendService.findReportN11Inactive().subscribe(
      (response)=>{
        console.log("Get Reponse Success Inactive :",response);
        this.reportN11InactiveList = response;
        this.loading = false;
        console.log("loading : ",this.loading);
        // for(let i of this.reportN11List){
        //   if(i.blockStatus==='ยังใช้งาน'){
        //     this.activeIndex++;
        //   }
        //   if(i.blockStatus==='คืน กสทช. แล้ว'){
        //     this.inactiveIndex++;
        //   }
        //   if(i.blockStatus==='อยู่ระหว่างดำเนินการคืน กสทช.'){
        //     this.inprogressIndex++;
        //   }
        // }

        // Add Comma in Sum Section
        const sumBlockAmountInactive = this.reportN11InactiveList.reduce((acc, curr) => acc + curr.qtyBlock,0);
        const sumNumberAmountAllInactive = this.reportN11InactiveList.reduce((acc, curr) => acc + curr.qtyNo,0);
        // const sumNumberAmountAssigned = this.reportN11InactiveList.reduce((acc, curr) => acc + curr.numberAmountAssigned,0);
        // const sumNumberAmountAssignedActive = this.reportN11InactiveList.reduce((acc, curr) => acc + curr.numberAmountAssignedActive,0);
        // const sumNumberAmountNotAssigned = this.reportN11InactiveList.reduce((acc, curr) => acc + curr.numberAmountNotAssigned,0);
        const sumFeeAmountInactive = this.reportN11InactiveList.reduce((acc, curr) => acc + curr.qtyPay,0);
        this.sumBlockAmountInactive = this.addComma(sumBlockAmountInactive);
        this.sumNumberAmountAllInactive = this.addComma(sumNumberAmountAllInactive);
        // this.sumNumberAmountAssigned = this.addComma(sumNumberAmountAssigned);
        // this.sumNumberAmountAssignedActive = this.addComma(sumNumberAmountAssignedActive);
        // this.sumNumberAmountNotAssigned = this.addComma(sumNumberAmountNotAssigned);
        this.sumFeeAmountInactive = this.addCommaFee(sumFeeAmountInactive);

        // Add Comma to Value in BlockList
        this.reportN11InactiveList = response.map((item:reportN11InactiveAndInProgress) => ({
          ...item,
          qtyBlock: this.addComma(item.qtyBlock),
          qtyNo: this.addComma(item.qtyNo),
          qtyPay: this.addCommaFee(item.qtyPay)
          }));
          this.loading = false;
      },
      (error)=>{
        console.log("Error : ",error);
      }
    )
    this.backendService.findReportN11InProgress().subscribe(
      (response)=>{
        console.log("Get Reponse Success InProgress:",response);
        this.reportN11InprogressList = response;
        this.loading = false;
        console.log("loading : ",this.loading);
        // for(let i of this.reportN11List){
        //   if(i.blockStatus==='ยังใช้งาน'){
        //     this.activeIndex++;
        //   }
        //   if(i.blockStatus==='คืน กสทช. แล้ว'){
        //     this.inactiveIndex++;
        //   }
        //   if(i.blockStatus==='อยู่ระหว่างดำเนินการคืน กสทช.'){
        //     this.inprogressIndex++;
        //   }
        // }

        // Add Comma in Sum Section
        const sumBlockAmountInProgress = this.reportN11InprogressList.reduce((acc, curr) => acc + curr.qtyBlock,0);
        const sumNumberAmountAllInProgress = this.reportN11InprogressList.reduce((acc, curr) => acc + curr.qtyNo,0);
        // const sumNumberAmountAssigned = this.reportN11InprogressList.reduce((acc, curr) => acc + curr.numberAmountAssigned,0);
        // const sumNumberAmountAssignedActive = this.reportN11InprogressList.reduce((acc, curr) => acc + curr.numberAmountAssignedActive,0);
        // const sumNumberAmountNotAssigned = this.reportN11InprogressList.reduce((acc, curr) => acc + curr.numberAmountNotAssigned,0);
        const sumFeeAmountInProgress = this.reportN11InprogressList.reduce((acc, curr) => acc + curr.qtyPay,0);
        this.sumBlockAmountInProgress = this.addComma(sumBlockAmountInProgress);
        this.sumNumberAmountAllInProgress = this.addComma(sumNumberAmountAllInProgress);
        // this.sumNumberAmountAssigned = this.addComma(sumNumberAmountAssigned);
        // this.sumNumberAmountAssignedActive = this.addComma(sumNumberAmountAssignedActive);
        // this.sumNumberAmountNotAssigned = this.addComma(sumNumberAmountNotAssigned);
        this.sumFeeAmountInProgress = this.addCommaFee(sumFeeAmountInProgress);

        // Add Comma to Value in BlockList
        this.reportN11InprogressList = response.map((item:reportN11InactiveAndInProgress) => ({
          ...item,
          qtyBlock: this.addComma(item.qtyBlock),
          qtyNo: this.addComma(item.qtyNo),
          qtyPay: this.addCommaFee(item.qtyPay)
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
  addCommaFee(data: any) {
    let temp = Number(data).toFixed(2);
    
    temp = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return temp;
  }
  showProviderDetail(provider:string,blockStatus:string){
    console.log(provider,blockStatus);
    if(provider==='TT&T'){
      provider = 'TT%26T'
    }
    this.router.navigateByUrl("/block/search/info?provider="+provider+"&blockStatus="+blockStatus)
  }
}
