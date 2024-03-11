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
interface Provider {
  name: string;
  value: string;
}

interface BlockStatus {
  name: string;
  value: string;
}

interface Location {
  name: string;
  value: string;
}

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
  ],
  templateUrl: './block-search.component.html',
  styleUrl: './block-search.component.scss',
})
export class BlockSearchComponent implements OnInit {
  blockForm!: FormGroup;
  provider!: Provider[];
  blockStatus!: BlockStatus[];
  location!: Location[];
  loading: boolean = false;
  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder
  ) {
    this.blockForm = this.formBuilder.group({
      phoneInfo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      provider: new FormControl<Provider | null>({
        name: 'ทั้งหมด',
        value: 'ALL',
      }),
      blockStatus: new FormControl<BlockStatus | null>({
        name: 'ทั้งหมด',
        value: 'ALL',
      }),
      location: new FormControl<BlockStatus | null>({
        name: 'ทั้งหมด',
        value: 'ALL',
      }),
    });
  }

  ngOnInit(): void {
    this.provider = [
      { name: 'ทั้งหมด', value: 'ALL' },
      { name: 'TOT', value: 'TOT' },
      { name: 'TT&T', value: 'TT&T' },
      { name: 'TRUE', value: 'TRUE' },
    ];
    this.blockStatus = [
      { name: 'ทั้งหมด', value: 'ALL' },
      { name: 'ยังใช้งาน', value: 'ST001' },
      { name: 'คืน กสทช. แล้ว', value: 'ST002' },
      { name: 'อยู่ระหว่างดำเนินการคืน กสทช.', value: 'Progress' },
    ];
    this.location = [
      { name: 'ทั้งหมด', value: 'ALL' },
      { name: 'น.1', value: 'n1' },
      { name: 'น.2', value: 'n2' },
      { name: 'น.3', value: 'n3' },
    ];
  }

  Search(form: FormGroup) {
    console.log(form.value.phoneInfo);
    console.log(form.value.provider.value);
    console.log(form.value.blockStatus.value);
    console.log(form.value.location.value);
    this.sendDataToBackend(form);
  }
  sendDataToBackend(form: FormGroup) {
    this.loading = true;
    let blockDetailDtoC: BlockDetailDtoC = {
      phoneNumber: form.value.phoneInfo,
      provider: form.value.provider.name,
      blockStatus: form.value.blockStatus.name,
      location: form.value.location.name,
    };
    this.backendService.findBlockDetail(blockDetailDtoC).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
        this.loading = false;
      },
      (error) => {
        console.error('Error sending data:', error);
        // Handle error if needed
        this.loading = false;
      }
    );
  }
}
