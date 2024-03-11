import { RouterLink } from '@angular/router';
import { Component,OnInit } from '@angular/core';
import { BackendService } from '../../../services/BackendService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink,CommonModule,SkeletonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  newsList: any[] = [];
  editLoading: boolean = false;

  constructor(
    private backendService: BackendService,
    private router: Router
  ) {}

  editNews(id:any){
    console.log(id);
    this.router.navigateByUrl('/admin/news/edit?id='+id);
  }

  ngOnInit() {
    this.editLoading = true;
    console.log(this.editLoading);
  this.backendService.init().subscribe(
    response => {
      this.newsList = response;
      console.log('Initail successfully:', response);
      this.editLoading = false
      // Handle response from backend if needed
    },
    error => {
      console.error('Error sending data:', error);
      // Handle error if needed
    }
  );
  }
}
