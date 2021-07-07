import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DatesComponent} from './/components/works/dates/dates.component';
import {AdminComponent} from './components/admin/admin.component';
import {AuthComponent} from './components/auth/auth.component';
import {AuthenticationGuard} from './components/auth/authentication.guard';
import {NewdateComponent} from './components/works/newdate/newdate.component';
import {WorksListComponent} from './components/works/works-list/works-list.component';
import {WorksComponent} from './components/works/works.component';
import {WorkstartComponent} from './components/works/workstart/workstart.component';

const routes: Routes = [
  {path: '', redirectTo: '/works', pathMatch: 'full'},
  {
    path: 'works',
    component: WorksComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {path: '', component: WorkstartComponent},
      {path: 'new', component: NewdateComponent},
      {path: ':id', component: WorksListComponent},
    ],
  },
  {path: 'admin', component: AdminComponent},
  {path: 'login', component: AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
