import { Component } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { BackendService } from '../../../services/BackendService';
import { PhoneInfo } from '../../../models/phoneInfo';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    SkeletonModule,
  ],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.scss',
})
export class PhoneComponent {
  phoneInfo!: PhoneInfo;
  phoneForm!: FormGroup;
  loading: boolean = false;
  products!: any;
  showInfo: boolean = false;
  checkEmpty: boolean = false;
  responeLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private backendService: BackendService
  ) {
    this.phoneForm = this.formBuilder.group({
      phoneInfo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      //newsDetail: ['<p>Default Detail</p>', Validators.required],
    });
  }
  Search(form: FormGroup) {
    if (!form.invalid) {
      this.sendDataToBackend(form);
    } else {
      this.checkEmpty = true;
    }
  }

  sendDataToBackend(form: FormGroup) {
    this.loading = true;
    this.responeLoading = true;
    this.backendService.findPhoneInfoById(form.value.phoneInfo).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
        if (response != null) {
          this.phoneInfo = response;
        } else {
          let phoneInfo: PhoneInfo = {
            phone: 'ไม่พบเลขหมายที่ค้นหา',
            serviceLocation: '-',
            crmStatus: '-',
            provider: '-',
            block: '-',
            assigned: '-',
            lastestBy: '-',
          };
          this.phoneInfo = phoneInfo;
        }
        this.loading = false;
        this.responeLoading = false;
        this.showInfo = true;
      },
      (error) => {
        console.error('Error sending data:', error);
        // Handle error if needed
        this.loading = false;
      }
    );
  }

  valid() {
    let error: any = this.phoneForm.get('phoneInfo')?.errors;
    console.log(error.pattern);
    return error.pattern;
  }

  required() {
    let error: any = this.phoneForm.get('phoneInfo')?.errors;
    console.log(error.required);
    return error.required;
  }
}
