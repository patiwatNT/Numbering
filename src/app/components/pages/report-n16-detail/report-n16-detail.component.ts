import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BackendService } from '../../../services/BackendService';
import { ActivatedRoute } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { ExcelService } from '../../../services/excel.service';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  selector: 'app-report-n16-detail',
  standalone: true,
  imports: [CommonModule, ButtonModule, PaginatorModule, SkeletonModule],
  templateUrl: './report-n16-detail.component.html',
  styleUrl: './report-n16-detail.component.scss',
})
export class ReportN16DetailComponent implements OnInit {
  block: string = '';
  blockAmount: string = '';
  reportN16DetailList: any[] = [];
  blockRange: string = '';
  first: number = 0;
  rows: number = 5;
  totalPage: number = 0;
  pagedData: any[] = [];
  excelObj: any = { block: '', blockAmount: '', reportN16DetailList: [] };
  loading: boolean = false;
  constructor(
    private backendService: BackendService,
    private activeRoute: ActivatedRoute,
    private excelService: ExcelService
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      this.block = params['block'];
      this.blockAmount = params['blockAmount'];
    });
    this.sendData();
  }
  sendData() {
    this.loading = true;
    if (this.block.includes('1000')) {
      this.backendService.findReportN16Block1000().subscribe(
        (response) => {
          console.log('Get Response Success : ', response);
          this.reportN16DetailList = response;
          this.setBlockRange(this.reportN16DetailList);
          this.excelObj = {
            block: this.block,
            blockAmount: this.blockAmount,
            reportN16DetailList: this.reportN16DetailList,
          };
          this.updatePagedData(0);
          this.loading = false;
        },
        (error) => {
          console.log('Error : ', error);
        }
      );
    } else if (this.block.includes('500') && this.block.includes('INC')) {
      this.backendService.findReportN16Block500Inc().subscribe(
        (response) => {
          console.log('Get Response Success : ', response);
          this.reportN16DetailList = response;
          this.setBlockRange(this.reportN16DetailList);
          this.excelObj = {
            block: this.block,
            blockAmount: this.blockAmount,
            reportN16DetailList: this.reportN16DetailList,
          };
          this.updatePagedData(0);
          this.loading = false;
        },
        (error) => {
          console.log('Error : ', error);
        }
      );
    } else if (this.block.includes('100') && this.block.includes('INC')) {
      this.backendService.findReportN16Block100Inc().subscribe(
        (response) => {
          console.log('Get Response Success : ', response);
          this.reportN16DetailList = response;
          this.setBlockRange(this.reportN16DetailList);
          this.excelObj = {
            block: this.block,
            blockAmount: this.blockAmount,
            reportN16DetailList: this.reportN16DetailList,
          };
          this.updatePagedData(0);
          this.loading = false;
        },
        (error) => {
          console.log('Error : ', error);
        }
      );
    } else if (this.block.includes('500') && this.block.includes('ONLY')) {
      this.backendService.findReportN16Block500Only().subscribe(
        (response) => {
          console.log('Get Response Success : ', response);
          this.reportN16DetailList = response;
          this.setBlockRange(this.reportN16DetailList);
          this.excelObj = {
            block: this.block,
            blockAmount: this.blockAmount,
            reportN16DetailList: this.reportN16DetailList,
          };
          this.updatePagedData(0);
          this.loading = false;
        },
        (error) => {
          console.log('Error : ', error);
        }
      );
    } else if (this.block.includes('100') && this.block.includes('ONLY')) {
      this.backendService.findReportN16Block100Only().subscribe(
        (response) => {
          console.log('Get Response Success : ', response);
          this.reportN16DetailList = response;
          this.setBlockRange(this.reportN16DetailList);
          this.excelObj = {
            block: this.block,
            blockAmount: this.blockAmount,
            reportN16DetailList: this.reportN16DetailList,
          };
          this.updatePagedData(0);
          this.loading = false;
        },
        (error) => {
          console.log('Error : ', error);
        }
      );
    }
  }
  onPageChange(event: any) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    this.updatePagedData(event.page);
  }

  updatePagedData(pageIndex: number) {
    const startIndex = pageIndex * this.rows;
    console.log(startIndex);
    const endIndex = startIndex + this.rows;
    console.log(endIndex);
    this.pagedData = this.reportN16DetailList.slice(startIndex, endIndex);
    this.totalPage = Math.ceil(this.reportN16DetailList.length / this.rows);
    console.log(this.pagedData);
  }

  exportExcel() {
    console.log(this.excelObj);
    this.excelService.generateExcelBlock('TestTemp', this.excelObj);
  }

  exportText() {
    // Example usage
    const textContent = this.createTextFile(this.reportN16DetailList);
    const fileName = 'example.txt';
    this.exportTextFile(textContent, fileName);
  }

  exportTextFile(textContent: string, fileName: string) {
    // Create a Blob from the text content
    const blob = new Blob([textContent], { type: 'text/plain' });

    // Create a URL object from the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;

    // Trigger a click event on the anchor element
    anchor.click();

    // Cleanup: remove the URL object
    URL.revokeObjectURL(url);
  }

  createTextFile(list: any[]): string {
    let data =
      'Block Id|Block Range|หมายเลขเริ่มต้น|หมายเลขสิ้นสุด|พื้นที่|จำนวนเลขหมาย|ค่าธรรมเนียมรายเดือน (บาท)\n';
    for (let i of list) {
      data += `${i.blockId}|${i.blockRange}|${i.blockStart}|${i.blockEnd}|${i.blockArea}|${i.qty}|${i.amt}\n`;
    }
    return data;
  }

  setBlockRange(data: any[]) {
    let i = 0;
    data.forEach((item) => {
      // Add additional fields to 'item' as needed
      let a = data[i].blockStart.substring(0, 1);
      let b = data[i].blockStart.substring(1, 5);
      let c = data[i].blockStart.substring(5, 9);
      let d = data[i].blockEnd.substring(5, 9);
      this.blockRange = a + ' ' + b + ' ' + c + ' - ' + d;
      //console.log(i,this.blockRange);
      item.blockRange = this.blockRange; // Example: Adding a new field 'additionalField' with a value 'value'
      i++;
    });
  }
}
