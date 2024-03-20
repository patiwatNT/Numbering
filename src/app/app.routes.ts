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

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'admin/news',
    component: NewsComponent
  },
  {
    path: 'admin/news/edit',
    component: NewsComponent
  },
  {
    path: 'phone',
    component: PhoneComponent
  },
  {
    path: 'block',
    component: BlockComponent
  },
  {
    path: 'block/search',
    component: BlockSearchComponent
  },
  {
    path: 'block/search/info',
    component: BlockSearchComponent
  },
  {
    path:'block/assignData',
    component: AssignSearchComponent
  },
  {
    path: 'assign',
    component: AssignComponent
  },
  {
    path: 'assign/search',
    component: AssignSearchComponent
  },
  {
    path: 'assign/search/info',
    component: AssignSearchComponent
  },
  {
    path:'report',
    component: ReportComponent
  },{
    path: 'data',
    component: DataComponent
  },
  {
    path: 'changeServiceLocation',
    component : ChangeServiceLocationComponent
  },
  {
    path: 'reportn11',
    component : ReportN11Component
  },
  {
    path: 'reportn12',
    component : ReportN12Component
  },
  {
    path: 'reportn13',
    component : ReportN13Component
  },
  {
    path: 'reportn14',
    component : ReportN14Component
  },
  {
    path: 'reportn15',
    component : ReportN15Component
  },
  {
    path: 'reportn16',
    component : ReportN16Component
  },
  {
    path:'**',
    redirectTo: 'main',
  },
];
