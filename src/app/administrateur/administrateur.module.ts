import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrateurRoutingModule } from './administrateur-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AgGridModule } from 'ag-grid-angular';
import { NgxPrintModule } from 'ngx-print';
import { NgxPaginationModule } from 'ngx-pagination';

// Component
import { AdministrateurComponent } from './administrateur.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { CalendarComponent } from '../component/calendar/calendar.component';
import { ModalComponent } from '../component/modal/modal.component';


@NgModule({
  declarations: [
    AdministrateurComponent,
    UtilisateurComponent,
    DashboardComponent,
    ProjectComponent,
    TaskComponent,
    CalendarComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    AdministrateurRoutingModule, 
    FormsModule, 
    LoadingBarModule,
    LoadingBarRouterModule,
    AgGridModule,
    NgxPrintModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    Ng2SearchPipeModule,
  ]
})
export class AdministrateurModule { }
