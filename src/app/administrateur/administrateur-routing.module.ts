import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrateurComponent } from './administrateur.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { User } from '../Object/Users';

const routes: Routes = [
  {
    path: '', component: AdministrateurComponent, children: [
      { path: '', redirectTo: 'Project', pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent, data: { entity: [{ type: User, instances: User }] } },
      { path: 'Project', component: ProjectComponent },
      { path: 'Task', component: TaskComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrateurRoutingModule { }
