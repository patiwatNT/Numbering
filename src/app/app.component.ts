import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/pages/main/main.component';
import { NewsComponent } from './components/pages/news/news.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,SidebarComponent,FooterComponent,MainComponent,NewsComponent,CommonModule,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'numbering-frontend';
  token = localStorage.getItem('token')
}
