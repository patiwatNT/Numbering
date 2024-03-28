import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule,ButtonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit{
  numberingReportList:any[] = []
  constructor(
    private backendService:BackendService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.sendDataToBackendService();
  }

  sendDataToBackendService(){
    this.backendService.findAllNumberingReport().subscribe(
      (response)=>{
        console.log("Get Reponse Success : ",response);
        this.numberingReportList = response;
      },
      (error)=>{
        console.log("Error :",error);
      }
    )
  }

  linkToAnotherReport(data:any){
    this.router.navigateByUrl("/report/"+data)
  }
}
