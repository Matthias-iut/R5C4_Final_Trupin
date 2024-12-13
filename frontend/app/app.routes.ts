import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchListComponent } from './search-list/search-list.component';
import { PageComponent } from './search-data/page/page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'searches',
    component: SearchListComponent,
  },
  {
    path: 'searches-data',
    component: PageComponent,
  },
];
