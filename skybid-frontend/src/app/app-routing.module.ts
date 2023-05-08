import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponentComponent } from './pages/chat/chat-component.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { RequestsListComponent } from './pages/requests-list/requests-list.component';
import { RequestDetailComponent } from './pages/request-detail/request-detail.component';
import { HeaderComponent } from './components/header/header.component';
import { AircraftListComponent } from './pages/aircraft-list/aircraft-list.component';
import { AddAircraftComponent } from './pages/add-aircraft/add-aircraft.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import 'hammerjs';
import { BrokerRequestsComponent } from './pages/broker-requests/broker-requests.component';
import { AuthGuard } from './auth/auth.guard';
import { AgreementComponent } from './components/agreement/agreement.component';
import { NotAuthGuard } from './auth/not-auth.guard';

const routes = [
  {path: 'chat', component: ChatComponentComponent },
  {path : 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  {path:'', component: LandingPageComponent,canActivate: [NotAuthGuard]},
  {path:'register', component: RegisterComponent,canActivate: [NotAuthGuard]},
  {path: 'request-list', component: RequestsListComponent, canActivate: [AuthGuard],data: {allowed_role:['operator']}},
  // {path: 'request-detail', component : RequestDetailComponent, canActivate: [AuthGuard], data},
  {path: 'aircrafts', component: AircraftListComponent, canActivate: [AuthGuard],data: {allowed_role:['operator']}},
  // {path: 'add-aircraft', component: AddAircraftComponent},
  {path: 'edit-profile', component: EditProfileComponent,canActivate: [AuthGuard],data: {allowed_role:['operator','broker']}},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard],data: {allowed_role:['admin']}},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],data: {allowed_role:['admin']}},
  {path: 'broker-requests', component: BrokerRequestsComponent,canActivate: [AuthGuard],data: {allowed_role:['broker']}},
  {path: 'agg', component : AgreementComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
