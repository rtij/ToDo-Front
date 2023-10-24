import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrateurComponent } from './administrateur.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: '', component: AdministrateurComponent, children: [
      { path: '', redirectTo: 'Project', pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Project', component: ProjectComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrateurRoutingModule { }
