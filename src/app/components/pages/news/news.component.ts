import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  ChangeEvent,
  FocusEvent,
  BlurEvent,
} from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BackendService } from '../../../services/BackendService';
import Adapter from '../../../services/ckeditorAdapter';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    InputTextModule,
    CKEditorModule,
    ButtonModule,
    ConfirmDialogModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SkeletonModule,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
  providers: [ConfirmationService],
})
export class NewsComponent implements OnInit {
  createBy: string = 'admin';
  newsId: any =null;
  news: any = {};
  myForm!: FormGroup;
  loading: boolean = false;
  public Editor = ClassicEditor;
  ckconfig: any;
  href = this.router.url;
  editLoading: boolean = false;

  ngOnInit() {
    this.ckconfig = {
      // include any other configuration you want
      extraPlugins: [this.customAdapterPlugin],
      placeHolder: 'เพิ่มเนื้อหา',
    };
    if (this.router.url.includes('/edit')) {
      this.getData();
    }
  }
  customAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new Adapter(loader, editor.config);
    };
  }

  onReady(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new Adapter(loader, editor.config);
    };
  }

  // public onChange({ editor }: ChangeEvent) {
  onChange(data: any) {
    console.log(data);
    // const data = editor.data.get();
    // this.newsDetail = data
    // console.log(data);
  }

  getData() {
    this.href = this.href.substring(this.href.indexOf('id=') + 3);
    console.log(this.href);
    this.editLoading = true;
    this.backendService.findNewsById(this.href).subscribe(
      (response) => {
        console.log('Initail successfully:', response);
        // Handle response from backend if needed
        this.myForm.patchValue({
          newsTitle: response.newsTitle,
          newsDetail: response.newsDetail,
        });
        this.editLoading = false;
        this.newsId = this.href;
      },
      (error) => {
        console.error('Error sending data:', error);
        // Handle error if needed
      }
    );
  }

  constructor(
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private backendService: BackendService,
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      newsTitle: ['Default Title', Validators.required],
      newsDetail: ['<p>Default Detail</p>', Validators.required],
    });
  }

  sendDataToBackend(form: FormGroup) {
    this.news.newsTitle = form.value.newsTitle;
    this.news.newsDetail = form.value.newsDetail;
    this.news.createBy = this.createBy;
    this.news.id = this.newsId;
    this.loading = true;
    this.backendService.saveNews(this.news).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
        this.router.navigateByUrl('/main');
        this.loading = false;
      },
      (error) => {
        console.error('Error sending data:', error);
        // Handle error if needed
        this.loading = false;
      }
    );
  }

  showError: boolean = false;

  Confirm(form: FormGroup) {
    this.confirmationService.confirm({
      header: 'ยืนยันการเพิ่มข่าวประชาสัมพันธ์',
      icon: 'pi pi-exclamation-triangle',
      message: 'คุณยืนยันการเพิ่มข่าวประชาสัมพันธ์บนหน้าเว็บไซต์?',
      acceptLabel: 'ยืนยัน',
      rejectLabel: 'ยกเลิก',
      rejectButtonStyleClass: 'confirm-dialog-reject-style',
      accept: () => {
        console.log('ยืนยันการเพิ่มข่าว');
        console.log(form.value.newsTitle);
        console.log(form.value.newsDetail);
        this.sendDataToBackend(form);
      },
    });
  }

  Close() {
    this.confirmationService.confirm({
      header: 'ยกเลิกการเพิ่มข่าวประชาสัมพันธ์',
      icon: 'pi pi-exclamation-triangle',
      message: 'การยกเลิกจยุติขั้นตอนที่คุณกำลังดำเนินการอยู่',
      acceptLabel: 'ยืนยัน',
      rejectLabel: 'ยกเลิก',
      rejectButtonStyleClass: 'confirm-dialog-reject-style',
      accept: () => {
        console.log('ยกเลิกการเพิ่มข่าว');
        this.router.navigateByUrl('/main');
      },
    });
  }
}
