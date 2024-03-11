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
    path: 'assign',
    component: AssignComponent
  },
  {
    path: 'assign/search',
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
    path:'**',
    redirectTo: 'main',
  },
];
