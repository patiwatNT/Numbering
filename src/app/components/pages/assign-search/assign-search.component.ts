import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { BackendService } from '../../../services/BackendService';
import { DropDownData } from '../../../models/dropdownData';
import { CommonModule } from '@angular/common';
import { AssignedRangeDtoC } from './../../../models/assignedRangeDtoC';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-assign-search',
  standalone: true,
  imports: [
    InputTextModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PaginatorModule
  ],
  templateUrl: './assign-search.component.html',
  styleUrl: './assign-search.component.scss',
})
export class AssignSearchComponent implements OnInit {
  assignedForm!: FormGroup;
  loading: boolean = false;
  provider: DropDownData[] = [
    {
      name: 'ทั้งหมด',
      value: '',
    },
  ];
  division: DropDownData[] = [
    {
      name: 'ทั้งหมด',
      value: '',
    },
  ];
  location: DropDownData[] = [
    {
      name: 'ทั้งหมด',
      value: '',
    },
  ];
  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder
  ) {
    this.assignedForm = this.formBuilder.group({
      phoneInfo: ['', [Validators.pattern('^[0-9]*$')]],
      provider: new FormControl<DropDownData | null>({
        name: 'ทั้งหมด',
        value: '',
      }),
      division: new FormControl<DropDownData | null>({
        name: 'ทั้งหมด',
        value: '',
      }),
      location: new FormControl<DropDownData | null>({
        name: 'ทั้งหมด',
        value: '',
      }),
      blockId: ['', [Validators.pattern('^[0-9]*$')]],
    });
  }

  ngOnInit(): void {
    // console.log("Block Detail list : ",this.blockDetailList);
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
    this.backendService.findAllDivision().subscribe(
      (response) => {
        console.log('Division Response Success ', response);
        for (let i of response) {
          this.division.push({
            name: i.name,
            value: i.id,
          });
        }
      },
      (error) => {
        console.log('Error Response ', error);
      }
    );
  }

  search(form: any) {
    console.log(form.value);
    if (!form.invalid) {
      this.sendDataToBackend(form);
    }
  }

  sendDataToBackend(form: FormGroup) {
    let assignedRangeDtoC: AssignedRangeDtoC = {
      phoneInfo: form.value.phoneInfo,
      provider: form.value.provider.value,
      division: form.value.division.value,
      location: form.value.location.value,
      blockId: form.value.blockId,
    };
    this.backendService.findAssignedRange(assignedRangeDtoC).subscribe(
      (response)=>{
        console.log("Get Response Success",response);
      },
      (error)=>{
        console.log("Error Response",error);
      }
    );
  }

  valid(formControlName: string) {
    let error: any = this.assignedForm.get(formControlName)?.errors;
    console.log(error.pattern);
    return error.pattern;
  }
}
