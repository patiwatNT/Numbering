import { Routes } from '@angular/router';
import { MainComponent } from './components/pages/main/main.component';
import { NewsComponent } from './components/pages/news/news.component';
import { PhoneComponent } from './components/pages/phone/phone.component';
import { BlockComponent } from './components/pages/block/block.component';
import { BlockSearchComponent } from './components/pages/block-search/block-search.component';
import { AssignComponent } from './components/pages/assign/assign.component';
import { AssignSearchComponent } from './components/pages/assign-search/assign-search.component';
import { ReportComponent } from './components/pages/report/report.component';
import { DataComponent } from './components/pages/data/data.component';
import { ChangeServiceLocationComponent } from './components/pages/change-service-location/change-service-location.component';
import { ReportN11Component } from './components/pages/report-n11/report-n11.component';
import { ReportN12Component } from './components/pages/report-n12/report-n12.component';
import { ReportN13Component } from './components/pages/report-n13/report-n13.component';
import { ReportN14Component } from './components/pages/report-n14/report-n14.component';
import { ReportN15Component } from './components/pages/report-n15/report-n15.component';
import { ReportN16Component } from './components/pages/report-n16/report-n16.component';
import { ReportN16DetailComponent } from './components/pages/report-n16-detail/report-n16-detail.component';
import { UserComponent } from './components/pages/user/user.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[LoginGuardService]
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'admin/news',
    component: NewsComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'admin/news/edit',
    component: NewsComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'phone',
    component: PhoneComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'block',
    component: BlockComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'block/search',
    component: BlockSearchComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'block/search/info',
    component: BlockSearchComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'block/assignData',
    component: AssignSearchComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'assign',
    component: AssignComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'assign/search',
    component: AssignSearchComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'assign/search/info',
    component: AssignSearchComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'report',
    component: ReportComponent,
    canActivate:[AuthGuardService]
  },{
    path: 'data',
    component: DataComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'changeServiceLocation',
    component : ChangeServiceLocationComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'report/N-11',
    component : ReportN11Component,
    canActivate:[AuthGuardService]
  },
  {
    path: 'report/N-12',
    component : ReportN12Component,
    canActivate:[AuthGuardService]
  },
  {
    path: 'report/N-13',
    component : ReportN13Component,
    canActivate:[AuthGuardService]
  },
  {
    path: 'report/N-14',
    component : ReportN14Component,
    canActivate:[AuthGuardService]
  },
  {
    path: 'report/N-15',
    component : ReportN15Component,
    canActivate:[AuthGuardService]
  },
  {
    path: 'report/N-16',
    component : ReportN16Component,
    canActivate:[AuthGuardService]
  },
  {
    path: 'report/N-16/detail',
    component : ReportN16DetailComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'**',
    redirectTo: 'main',
  },
];
