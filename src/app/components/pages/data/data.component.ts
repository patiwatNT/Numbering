import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule,SkeletonModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})
export class DataComponent implements OnInit{
  dataExportList:any[] = [];
  loading:boolean = false;
  constructor(private backendService:BackendService){}
  ngOnInit(): void {
    this.sendData();
  }
  sendData(){
    this.loading = true;
    this.backendService.findDataExport().subscribe(
      (response)=>{
        console.log("Get Response Success : ",response);
        this.dataExportList = response;


        // Add Comma to Value in BlockList
        this.dataExportList = response.map((item:any) => ({
          ...item,
          dataAmount: this.addComma(item.dataAmount),
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
}
