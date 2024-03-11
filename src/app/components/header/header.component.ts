import { BackendService } from './../../services/BackendService';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private backendService: BackendService
  ) {}
  init() {
    this.backendService.init().subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
        // Handle response from backend if needed
      },
      (error) => {
        console.error('Error sending data:', error);
        // Handle error if needed
      }
    );
  }
}
