import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrateurComponent } from './administrateur.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { User } from '../Object/Users';
import { Project } from '../Object/Project';
import { Task } from '../Object/task';

const routes: Routes = [
  {
    path: '', component: AdministrateurComponent, children: [
      { path: '', redirectTo: 'Project', pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent, data: { entity: [{ type: Task, instances: Task }, {type: Project, instances: Project}] } },
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
