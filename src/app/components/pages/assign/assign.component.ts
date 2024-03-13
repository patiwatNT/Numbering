import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../../services/BackendService';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-assign',
  standalone: true,
  imports: [CommonModule,SkeletonModule],
  templateUrl: './assign.component.html',
  styleUrl: './assign.component.css'
})
export class AssignComponent implements OnInit{
  constructor(private backendService:BackendService){}
  assignList:any[] = [];
  sumRangedAmount:string = '';
  sumTelAmount:string = '';
  loading:boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.backendService.findAllAssigned().subscribe(
      (response) => {
        console.log("Get Reponse Data Success : ",response);
        this.assignList = response;

        // Add Comma in Sum Section
        const sumRangedAmount = this.assignList.reduce((acc, curr) => acc + curr.rangeAmount,0);
        const sumTelAmount = this.assignList.reduce((acc, curr) => acc + curr.telAmount,0);
        this.sumRangedAmount = this.addComma(sumRangedAmount);
        this.sumTelAmount = this.addComma(sumTelAmount);

        // Add Comma to Value in BlockList
        this.assignList = response.map((item:any) => ({
          ...item,
          rangeAmount: this.addComma(item.rangeAmount),
          telAmount: this.addComma(item.telAmount)
          }));
          this.loading = false;
      },
      (error) => {
        console.log("Error :" ,error);
      }

    )
  }
  addComma(data: any) {
    let temp = Number(data).toFixed(0);
    
    temp = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return temp;
  }
}
