import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { ReportN11 } from '../../../models/reportN11';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-n11',
  standalone: true,
  imports: [CommonModule,ButtonModule],
  templateUrl: './report-n11.component.html',
  styleUrl: './report-n11.component.scss'
})
export class ReportN11Component implements OnInit{
  constructor(private backendService:BackendService,private router:Router){}
  reportN11List:any[] = [];
  activeIndex:number = 0;
  inprogressIndex:number = 0;
  inactiveIndex:number = 0;
  sumBlockAmount:string = "";
  sumNumberAmountAll:string = "";
  sumNumberAmountAssigned:string = "";
  sumNumberAmountAssignedActive:string = "";
  sumNumberAmountNotAssigned:string = "";
  sumFeeAmount:string = "";
  loading:boolean = false;
  ngOnInit(): void {
    this.sendData();
  }

  sendData(){
    this.backendService.findAllReportN11().subscribe(
      (response)=>{
        console.log("Get Reponse Success :",response);
        this.reportN11List = response;

        for(let i of this.reportN11List){
          if(i.blockStatus==='ยังใช้งาน'){
            this.activeIndex++;
          }
          if(i.blockStatus==='คืน กสทช. แล้ว'){
            this.inactiveIndex++;
          }
          if(i.blockStatus==='อยู่ระหว่างดำเนินการคืน กสทช.'){
            this.inprogressIndex++;
          }
        }

        // Add Comma in Sum Section
        const sumBlockAmount = this.reportN11List.reduce((acc, curr) => acc + curr.blockAmount,0);
        const sumNumberAmountAll = this.reportN11List.reduce((acc, curr) => acc + curr.numberAmountAll,0);
        const sumNumberAmountAssigned = this.reportN11List.reduce((acc, curr) => acc + curr.numberAmountAssigned,0);
        const sumNumberAmountAssignedActive = this.reportN11List.reduce((acc, curr) => acc + curr.numberAmountAssignedActive,0);
        const sumNumberAmountNotAssigned = this.reportN11List.reduce((acc, curr) => acc + curr.numberAmountNotAssigned,0);
        const sumFeeAmount = this.reportN11List.reduce((acc, curr) => acc + curr.feeAmount,0);
        this.sumBlockAmount = this.addComma(sumBlockAmount);
        this.sumNumberAmountAll = this.addComma(sumNumberAmountAll);
        this.sumNumberAmountAssigned = this.addComma(sumNumberAmountAssigned);
        this.sumNumberAmountAssignedActive = this.addComma(sumNumberAmountAssignedActive);
        this.sumNumberAmountNotAssigned = this.addComma(sumNumberAmountNotAssigned);
        this.sumFeeAmount = this.addCommaFee(sumFeeAmount);

        // Add Comma to Value in BlockList
        this.reportN11List = response.map((item:ReportN11) => ({
          ...item,
          blockAmount: this.addComma(item.blockAmount),
          numberAmountAll: this.addComma(item.numberAmountAll),
          numberAmountAssigned: this.addComma(item.numberAmountAssigned),
          numberAmountAssignedActive: this.addComma(item.numberAmountAssignedActive),
          numberAmountNotAssigned: this.addComma(item.numberAmountNotAssigned),
          feeAmount: this.addCommaFee(item.feeAmount)
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
