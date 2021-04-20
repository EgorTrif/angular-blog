import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { AuthGuardService } from './shared/services/auth.guard.service';
import { SharedModule } from '../shared/shared.module';
import { SearchPipe } from './shared/search.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';



@NgModule({
  declarations: [AdminLayoutComponent,
  LoginPageComponent,
  CreatePageComponent,
  DashboardPageComponent,
  EditPageComponent,
  SearchPipe,
  AlertComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
          {path: 'login', component: LoginPageComponent},
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuardService]},
          {path: 'create', component: CreatePageComponent, canActivate: [AuthGuardService]},
          {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuardService]}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [LoginPageComponent, AuthGuardService, AlertService],
})
export class AdminModule { }
