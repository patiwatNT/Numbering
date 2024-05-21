import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';
import {
  ConfirmationService,
  MessageService,
  SelectItemGroup,
} from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { DropDownData } from '../../../models/dropdownData';
import { CookieService } from 'ngx-cookie-service';
import { error } from 'console';
import { AssignedRange } from '../../../models/assigned-range';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { AssignedRangeDtoC } from '../../../models/assignedRangeDtoC';
import { EditAssingedDetailObj } from '../../../models/edit-assinged-detail-obj';

@Component({
  selector: 'app-assigned-admin',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    SkeletonModule,
    ConfirmDialogModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    PaginatorModule,
  ],
  templateUrl: './assigned-admin.component.html',
  styleUrl: './assigned-admin.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class AssignedAdminComponent implements OnInit {
  blockId: number = 0;
  blockObj: any = {};
  assignedId: number = 0;
  assignedStart: string = '';
  assignedEnd: string = '';
  assignedQty: string = '';
  loading: boolean = false;
  visible: boolean = false;
  editAssignedVisible: boolean = false;
  editAssignedDetailVisible: boolean = false;
  addAssignedLoading: boolean = false;
  editAssignedLoading: boolean = false;
  editAssignedDetailLoading: boolean = false;
  checkEmpty: boolean = false;
  providerId: number = 0;
  selectedLocation: string = '';
  // selectedRegion:string = '';
  // selectedDept:string = '';
  // selectedSector:string = '';
  // selectedProvince:string = '';
  // selectedProduct:string = '';
  first: number = 0;
  rows: number = 5;
  pagedData: any[] = [];
  assignedRangeList: any[] = [];
  blockArea: DropDownData[] = [
    {
      name: 'ระบุพื้นที่/สำนัก',
      value: '',
    },
  ];
  serviceLocation: SelectItemGroup[] = [
    {
      label: 'ระบุ Service Location',
      value: '',
      items: [],
    },
  ];
  assignedRegion: DropDownData[] = [
    {
      name: '---สำนัก---',
      value: '',
    },
  ];
  assignedDept: DropDownData[] = [
    {
      name: '---ฝ่าย---',
      value: '',
    },
  ];
  assignedSector: DropDownData[] = [
    {
      name: '---ส่วน---',
      value: '',
    },
  ];
  province: DropDownData[] = [
    {
      name: '---จังหวัด---',
      value: '',
    },
  ];
  serviceType: DropDownData[] = [
    {
      name: '---Product Type---',
      value: '',
    },
  ];
  addAssignedForm: FormGroup;
  editAssignedForm: FormGroup;
  editAssignedDetailForm: FormGroup;
  user: string = '';
  assignedAmount: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private cookies: CookieService,
    private router: Router
  ) {
    this.addAssignedForm = this.formBuilder.group({
      blockStart: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      blockEnd: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      blockArea: new FormControl<DropDownData | null>({
        name: 'ระบุพื้นที่/สำนัก',
        value: '',
      }),
      selectedLocation: '',
    });
    this.editAssignedForm = this.formBuilder.group({
      assignedStart: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      assignedEnd: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      selectedLocation: '',
    });
    this.editAssignedDetailForm = this.formBuilder.group({
      assignedRegion: new FormControl<DropDownData | null>({
        name: '---สำนัก---',
        value: '',
      }),
      //selectedRegion: '',
      assignedDept: new FormControl<DropDownData | null>({
        name: '---ฝ่าย---',
        value: '',
      }),
      //selectedDept: '',
      assignedSector: new FormControl<DropDownData | null>({
        name: '---ส่วน---',
        value: '',
      }),
      //selectedSector: '',
      stationCode: [''],
      stationAbbr: [''],
      stationCodeTtt: [''],
      stationNameEn: [''],
      province: new FormControl<DropDownData | null>({
        name: '---จังหวัด---',
        value: '',
      }),
      //selectedProvince: '',
      serviceType: new FormControl<DropDownData | null>({
        name: '---Product Type---',
        value: '',
      }),
      //selectedProduct: '',
      docRef: [''],
    });
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      this.blockId = params['blockId'];
      this.user = this.cookies.get('user');
      this.backendService.findProvince().subscribe(
        (response) => {
          //console.log(response);
          response.sort((a: { name_th: string }, b: { name_th: string }) => {
            return a.name_th.localeCompare(b.name_th);
          });
          //console.log(response);
          for (let i of response) {
            if (i != null) {
              this.province.push({
                name: i.name_th,
                value: i.name_th,
              });
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
      this.backendService.findNumberingLocation().subscribe(
        (response) => {
          //console.log('Location Reposnse Success', response);
          for (let i of response) {
            if (i != null) {
              this.assignedRegion.push({
                name: i,
                value: i,
              });
              this.blockArea.push({
                name: i,
                value: i,
              });
            }
          }
        },
        (error) => {
          console.log('Reposnse Error ', error);
        }
      );
      this.backendService.findAllDept().subscribe(
        (response) => {
          //console.log('Dept Response Success ', response);
          for (let i of response) {
            if (i != null) {
              this.assignedDept.push({
                name: i,
                value: i,
              });
            }
          }
        },
        (error) => {
          console.log('Error Response ', error);
        }
      );
      this.backendService.findAllDivision().subscribe(
        (response) => {
          //console.log('Division Response Success ', response);
          for (let i of response) {
            if (i != null) {
              this.assignedSector.push({
                name: i,
                value: i,
              });
            }
          }
        },
        (error) => {
          console.log('Error Response ', error);
        }
      );
      this.backendService.findAllProduct().subscribe(
        (response) => {
          console.log('Product Response Success ', response);
          for (let i of response) {
            if (i != null) {
              this.serviceType.push({
                name: i,
                value: i,
              });
            }
          }
        },
        (error) => {
          console.log('Error Response ', error);
        }
      );
      this.backendService.findServiceLocation().subscribe(
        (response) => {
          //console.log('Get Response Success', response);
          let newRes = [
            {
              label: '',
              value: '',
              items: [
                {
                  label: 'ระบุ Service Location',
                  value: '',
                },
              ],
            },
          ];
          for (let i of response) {
            newRes.push({
              items: i.items,
              label: i.label,
              value: i.value,
            });
          }
          this.serviceLocation = newRes;
        },
        (error) => {
          console.log('Error', error);
        }
      );
    });
    this.backendService.findBlockById(this.blockId).subscribe((response) => {
      console.log('Get Response Success :', response);
      this.blockObj = response;
      this.providerId = response.providerId;
    });
    this.sendDataToBackend(this.blockId);
  }

  sendDataToBackend(blockId: number) {
    this.loading = true;
    let assignedRangeDtoC: AssignedRangeDtoC = {
      blockId: blockId.toString(),
      phoneInfo: '',
      provider: '',
      division: '',
      location: '',
    };
    this.backendService.findAssignedRange(assignedRangeDtoC).subscribe(
      (response) => {
        console.log('Get Response Success', response);
        this.backendService.findAssignedAmount(assignedRangeDtoC).subscribe(
          (response1) => {
            console.log('Response Success : ', response1);
            this.assignedAmount = response1;
            let i = 0;
            response.forEach((item: { okLocation: any; noLocation: any }) => {
              // Add additional fields to 'item' as needed
              item.okLocation = this.assignedAmount[i].okLocation; // Example: Adding a new field 'additionalField' with a value 'value'
              item.noLocation = this.assignedAmount[i].noLocation;
              i++;
            });
            this.assignedRangeList = response;
            this.loading = false;
            this.updatePagedData(0);
          },
          (error) => {
            console.log('Error :', error);
          }
        );
      },
      (error) => {
        console.log('Error Response', error);
      }
    );
  }

  addAssignedRange() {
    console.log('Add Assigned Range');
    this.visible = true;
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

  valid(value: string) {
    let error: any = this.addAssignedForm.get(value)?.errors;
    console.log(error.pattern);
    return error.pattern;
  }

  required(value: string) {
    let error: any = this.addAssignedForm.get(value)?.errors;
    console.log(error.required);
    return error.required;
  }

  addAssignedConfirm(form: FormGroup, data: any) {
    let blockStart = form.value.blockStart;
    let blockEnd = form.value.blockEnd;

    this.confirmationService.confirm({
      header: 'ยืนยันการแก้ไข Service Location',
      icon: 'pi pi-exclamation-triangle',
      message:
        'คุณยืนยันที่จะเพิ่มช่วง Assigned ของเลขหมาย ' +
        blockStart +
        '-' +
        blockEnd,
      acceptLabel: 'ยืนยัน',
      rejectLabel: 'ยกเลิก',
      rejectButtonStyleClass: 'confirm-dialog-reject-style',
      accept: () => {
        if (blockStart >= data.blockStart && blockEnd <= data.blockEnd) {
          let assignedRange: AssignedRange = {
            blockStart: blockStart,
            blockEnd: blockEnd,
            selectedLocation:
              form.value.selectedLocation != ''
                ? form.value.selectedLocation
                : null,
            blockArea: form.value.blockArea.value,
            blockId: this.blockId,
            providerId: this.providerId,
            empCode: this.cookies.get('empCode'),
            assignedId: this.assignedId,
          };
          console.log('Add Assigned Button', assignedRange);
          this.addAssignedLoading = true;
          this.backendService.addAssignedRange(assignedRange).subscribe(
            (response) => {
              console.log('Response : ', response);
              if (response === 'Success') {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'เพิ่มช่วง Assigned สำเร็จ',
                });
                this.visible = false;
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'หมายเลขในช่วง Assigned ใหม่มีการ Assigned ช่วงไปแล้ว',
                });
              }
              this.addAssignedLoading = false;
            },
            (error) => {
              console.log('Error', error);
            }
          );
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'เลขหมายต้องอยู่ในช่วง ' + data.blockStart + '-' + data.blockEnd,
          });
        }
      },
    });
  }
  editAssignedConfirm(form: FormGroup, data: any) {
    console.log('Edit Assigned Button', form.value);
    let blockStart = form.value.assignedStart;
    let blockEnd = form.value.assignedEnd;
    this.confirmationService.confirm({
      header: 'ยืนยันการแก้ไขช่วง Assigned',
      icon: 'pi pi-exclamation-triangle',
      message:
        'คุณยืนยันที่จะแก้ไขช่วง Assigned ของเลขหมาย ' +
        blockStart +
        '-' +
        blockEnd,
      acceptLabel: 'ยืนยัน',
      rejectLabel: 'ยกเลิก',
      rejectButtonStyleClass: 'confirm-dialog-reject-style',
      accept: () => {
        if (blockStart >= data.blockStart && blockEnd <= data.blockEnd) {
          let assignedRange: AssignedRange = {
            blockStart: blockStart,
            blockEnd: blockEnd,
            selectedLocation:
              form.value.selectedLocation != ''
                ? form.value.selectedLocation
                : null,
            blockArea: '',
            blockId: this.blockId,
            providerId: this.providerId,
            empCode: this.cookies.get('empCode'),
            assignedId: this.assignedId,
          };
          console.log('Edit Assigned Button', assignedRange);
          this.editAssignedLoading = true;
          this.backendService.editAssignedRange(assignedRange).subscribe(
            (response) => {
              console.log('Response : ', response);
              if (response === 'Success') {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: 'แก้ไขช่วง Assigned สำเร็จ',
                });
                this.visible = false;
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail:
                    'หมายเลขในช่วง Assigned ใหม่มีการ Assigned ช่วงไปแล้ว',
                });
              }
              this.editAssignedLoading = false;
              this.editAssignedVisible = false;
            },
            (error) => {
              console.log('Error', error);
            }
          );
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'เลขหมายต้องอยู่ในช่วง ' + data.blockStart + '-' + data.blockEnd,
          });
        }
      },
    });
  }
  editAssignedDetailConfirm(form: FormGroup) {
    let editAssignedDetailObj:EditAssingedDetailObj={
      assignedId:this.assignedId,
      assignedRegion: form.value.assignedRegion.value!=''?form.value.assignedRegion.value:null,
      assignedDept: form.value.assignedDept.value!=''?form.value.assignedDept.value:null,
      assignedSector: form.value.assignedSector.value!=''?form.value.assignedSector.value:null,
      stationCode: form.value.stationCode!=''?form.value.stationCode:null,
      stationAbbr: form.value.stationAbbr!=''?form.value.stationAbbr:null,
      stationCodeTtt: form.value.stationCodeTtt!=''?form.value.stationCodeTtt:null,
      stationNameEn: form.value.stationNameEn!=''?form.value.stationNameEn:null,
      province: form.value.province.value!=''?form.value.province.value:null,
      serviceType: form.value.serviceType.value!=''?form.value.serviceType.value:null,
      docRef: form.value.docRef!=''?form.value.docRef:null
    }
    console.log('Edit Assigned Detail Obj', editAssignedDetailObj);
    this.confirmationService.confirm({
      header: 'ยืนยันการแก้ไข Service Location',
      icon: 'pi pi-exclamation-triangle',
      message:
        'คุณยืนยันที่จะเพิ่มรายละเอียดช่วง Assigned ของเลขหมาย ' +
        this.assignedStart +
        '-' +
        this.assignedEnd,
      acceptLabel: 'ยืนยัน',
      rejectLabel: 'ยกเลิก',
      rejectButtonStyleClass: 'confirm-dialog-reject-style',
      accept: () => {
        this.editAssignedDetailLoading = true;
        this.backendService.editAssignedRangeDetail(editAssignedDetailObj).subscribe(
          (response)=>{
            console.log(response);
            this.editAssignedDetailLoading = false;
            this.editAssignedDetailVisible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'เพิ่มรายละเอียดช่วง Assigned สำเร็จ',
            });
          },
          (error)=>{
            console.log("Error : ",error);
          }
        )
      },
    });
  }

  editAssigned(assignedStart: string, assignedEnd: string, assignedId: number) {
    console.log(assignedStart, assignedEnd, assignedId);
    this.assignedId = assignedId;
    this.editAssignedForm = this.formBuilder.group({
      assignedStart: assignedStart,
      assignedEnd: assignedEnd,
      selectedLocation: '',
    });
    this.editAssignedVisible = true;
  }
  editAssignedDetail(data: any) {
    console.log(data);
    this.assignedId = data.assignedId;
    this.assignedStart = data.assignedStart;
    this.assignedEnd = data.assignedEnd;
    this.assignedQty = data.assignedQty;
    this.editAssignedDetailForm = this.formBuilder.group({
      assignedRegion: new FormControl<DropDownData | null>({
        name: data.assignedRegion != null?data.assignedRegion:'---สำนัก---',
        value: data.assignedRegion != null ? data.assignedRegion : '',
      }),
      //selectedRegion: '',
      assignedDept: new FormControl<DropDownData | null>({
        name: data.assignedDept != null ? data.assignedDept : '---ฝ่าย---',
        value: data.assignedDept != null ? data.assignedDept : '',
      }),
      //selectedDept: '',
      assignedSector: new FormControl<DropDownData | null>({
        name: data.assignedSector != null ? data.assignedSector : '---ส่วน---',
        value: data.assignedSector != null ? data.assignedSector : '',
      }),
      //selectedSector: '',
      stationCode: data.stationCode,
      stationAbbr: data.stationAbbr,
      stationCodeTtt: data.stationCodeTtt,
      stationNameEn: data.stationNameEn,
      province: new FormControl<DropDownData | null>({
        name: data.province != null ? data.province : '---จังหวัด---',
        value: data.province != null ? data.province : '',
      }),
      //selectedProvince: '',
      serviceType: new FormControl<DropDownData | null>({
        name: data.serviceType != null ? data.serviceType : '---Product Type---',
        value: data.serviceType != null ? data.serviceType : '',
      }),
      //selectedProduct: '',
      docRef: data.docRef,
    });
    this.editAssignedDetailVisible = true;
    //console.log(this.assignedRegion,this.assignedDept,this.assignedSector);
  }
  changeServiceLocation(assignRangeId: string) {
    console.log('change Service Location');
    console.log(assignRangeId);
    this.router.navigateByUrl(
      '/changeServiceLocation?assignRangeId=' + assignRangeId
    );
  }
}
