import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../../../services/BackendService';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { BlockDetailDtoC } from '../../../models/blockDetailDtoC';
import { Provider } from '../../../models/provider';
import { BlockStatus } from '../../../models/blockStatus';
import { Location } from '../../../models/location';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-block-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    ButtonModule,
    SkeletonModule,
    PaginatorModule
  ],
  templateUrl: './block-search.component.html',
  styleUrl: './block-search.component.scss',
})
export class BlockSearchComponent implements OnInit {
  blockForm!: FormGroup;
  phoneInfo: string = "";
  haveData:boolean = false;
  provider: Provider[] = [
    {
      name: 'ทั้งหมด',
      value: '',
    },
  ];
  blockStatus: BlockStatus[] = [
    {
      name: 'ทั้งหมด',
      value: '',
    },
  ];
  location: Location[] = [
    {
      name: 'ทั้งหมด',
      value: '',
    },
  ];
  loading: boolean = false;
  responseLoading:boolean = false;
  blockDetailList:any[] = [];
  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder
  ) {
    this.blockForm = this.formBuilder.group({
      phoneInfo: ['', [Validators.pattern('^[0-9]*$')]],
      provider: new FormControl<Provider | null>({
        name: 'ทั้งหมด',
        value: '',
      }),
      blockStatus: new FormControl<BlockStatus | null>({
        name: 'ทั้งหมด',
        value: '',
      }),
      location: new FormControl<BlockStatus | null>({
        name: 'ทั้งหมด',
        value: '',
      }),
    });
  }

  ngOnInit(): void {
    console.log("Block Detail list : ",this.blockDetailList);
    this.backendService.findAllBlock().subscribe(
      (response) => {
        console.log('Provider Repsponse', response);
        for (let i of response) {
          this.provider.push({
            name: i.provide,
            value: i.provide,
          });
        }
      },
      (error) => {
        console.log('Error Repsonse', error);
      }
    );
    this.backendService.findByStatusGroup('BLOCK').subscribe(
      (response) => {
        console.log('Status Reposnse Success', response);
        for (let i of response) {
          this.blockStatus.push({
            name: i.statusDescription,
            value: i.statusCode,
          });
        }
      },
      (error) => {
        console.log('Reposnse Error ', error);
      }
    );
    this.backendService.findNumberingLocation().subscribe(
      (response) => {
        console.log('Location Reposnse Success', response);
        for (let i of response) {
          this.location.push({
            name: i.name,
            value: i.value,
          });
        }
      },
      (error) => {
        console.log('Reposnse Error ', error);
      }
    );
  }

  search(form: FormGroup) {
    console.log(form.value);
     if(!form.invalid){
      this.sendDataToBackend(form);
      this.phoneInfo = form.value.phoneInfo;
     }
  }
  sendDataToBackend(form: FormGroup) {
    this.loading = true;
    let blockDetailDtoC: BlockDetailDtoC = {
      phoneNumber: form.value.phoneInfo,
      provider: form.value.provider.value,
      blockStatus: form.value.blockStatus.value,
      location: form.value.location.value,
    };
    this.backendService.findBlockDetail(blockDetailDtoC).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
       this.blockDetailList = response;
       console.log(this.haveData);
        this.loading = false;
        this.responseLoading = true;
        this.updatePagedData(0);
      },
      (error) => {
        console.error('Error sending data:', error);
        // Handle error if needed
        this.loading = false;
      }
    );
  }

  first: number = 0;
  rows: number = 5;
  pagedData: any[] = [];

  onPageChange(event: any) {
      console.log(event);
      this.first = event.first;
      this.rows = event.rows;
        this.updatePagedData(event.page)
  }

  updatePagedData(pageIndex: number) {
    const startIndex = pageIndex * this.rows;
    console.log(startIndex);
    const endIndex = startIndex + this.rows;
    console.log(endIndex);
    this.pagedData = this.blockDetailList.slice(startIndex, endIndex);
    console.log(this.pagedData);
  }

  assign(){
    console.log("click");
  }

  valid() {
    let error: any = this.blockForm.get('phoneInfo')?.errors;
    console.log(error.pattern);
    return error.pattern;
  }
}
