import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ModelServiceService } from './Service/model-service.service';
import { HeaderComponent } from './components/header/header.component';
import { WorksComponent } from './components/works/works.component';
import { DatesComponent } from './/components/works/dates/dates.component';
import { NewdateComponent } from './components/works/newdate/newdate.component';
import { WorkstartComponent } from './components/works/workstart/workstart.component';
import { WorksListComponent } from './components/works/works-list/works-list.component';
import { ModalWorksComponent } from './components/works/modal-works/modal-works.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalServiceService } from './Service/modal-service.service';
import { ModalDatesComponent } from './components/works/modal-dates/modal-dates.component';
import { ActiveDirectiveDirective } from './components/shared/active-directive.directive';
import { AuthComponent } from './components/auth/auth.component';
import { AuthInterceptorService } from './components/shared/Auth-interceptor';
import { ModalSignupComponent } from './components/works/modal-signup/modal-signup.component';
import { ModalPasswordchangeComponent } from './components/works/modal-passwordchange/modal-passwordchange.component';
import { AdminComponent } from './components/admin/admin.component';
import { ChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DatesComponent,
    WorksComponent,
    NewdateComponent,
    WorkstartComponent,
    WorksListComponent,
    ModalWorksComponent,
    ModalDatesComponent,
    ActiveDirectiveDirective,
    AuthComponent,
    ModalSignupComponent,
    ModalPasswordchangeComponent,
    AdminComponent
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [ModelServiceService,ModalServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
