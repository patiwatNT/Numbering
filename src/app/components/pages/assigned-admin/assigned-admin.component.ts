import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../../services/BackendService';
import { AssignedRangeDtoC } from '../../../models/assignedRangeDtoC';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-assigned-admin',
  standalone: true,
  imports: [CommonModule,ButtonModule],
  templateUrl: './assigned-admin.component.html',
  styleUrl: './assigned-admin.component.scss'
})
export class AssignedAdminComponent implements OnInit{
  constructor(
    private activeRoute : ActivatedRoute,
    private backendService : BackendService
  ){}
  blockId:number = 0;
  blockObj:any = {}
  loading: boolean = false;
  first: number = 0;
  rows: number = 5;
  pagedData: any[] = [];
  assignedRangeList:any[] = []
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params=>{
      this.blockId  = params['blockId'];
    })
    this.backendService.findBlockById(this.blockId).subscribe(
      (response)=>{
        console.log("Get Response Success :",response);
        this.blockObj = response;
      }
    )
    this.getData();
  }
  addAssignedRange(){
    console.log("Add Assigned Range");
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
    this.pagedData = this.assignedRangeList.slice(startIndex, endIndex);
    console.log(this.pagedData);
  }
  getData() {
    this.loading = true;
    let data = { blockId: this.blockId };
    this.backendService.findAssignedRange(data).subscribe(
      (response) => {
        console.log('Success', response);
        this.assignedRangeList = response;
        this.updatePagedData(0);
        this.loading = false;
        //this.responseLoading = true;
        console.log(this.assignedRangeList.length);
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
}
