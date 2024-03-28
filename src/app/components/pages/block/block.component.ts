import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { Block } from '../../../models/block';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-block',
  standalone: true,
  imports: [CommonModule,SkeletonModule,ButtonModule],
  templateUrl: './block.component.html',
  styleUrl: './block.component.scss',
})
export class BlockComponent implements OnInit {
  blockList: any[] = [];
  sumBlockAmount: string = '';
  sumNumberAmount: string = '';
  sumFeeAmount: string = '';
  loading:boolean = false;

  constructor(private backendService: BackendService,private router: Router) {}
  ngOnInit() {
    this.loading = true;
    this.backendService.findAllBlock().subscribe(
      (response) => {
        this.blockList = response;
        console.log('Initail successfully:', response);

        // Add Comma in Sum Section
        const sumBlockAmount = this.blockList.reduce((acc, curr) => acc + curr.blockAmount,0);
        const sumNumberAmount = this.blockList.reduce((acc, curr) => acc + curr.numberAmount,0);
        const sumFeeAmount = this.blockList.reduce((acc, curr) => acc + curr.feeAmount,0);
        this.sumBlockAmount = this.addComma(sumBlockAmount);
        this.sumNumberAmount = this.addComma(sumNumberAmount);
        this.sumFeeAmount = this.addComma(sumFeeAmount);

        // Add Comma to Value in BlockList
        this.blockList = response.map((item:Block) => ({
          ...item,
          blockAmount: this.addComma(item.blockAmount),
          numberAmount: this.addComma(item.numberAmount),
          feeAmount: this.addComma(item.feeAmount)
          }));
          this.loading = false;
      },
      (error) => {
        console.error('Error sending data:', error);
        // Handle error if needed
      }
    );
  }

  addComma(data: any) {
    let temp = Number(data).toFixed(2);
    
    temp = temp.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return temp;
  }

  showProviderDetail(data:any){
    if(data==='TT&T'){
      data = 'TT%26T'
    }
    this.router.navigateByUrl("/block/search/info?provider="+data)
  }
}
