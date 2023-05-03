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

const routes = [
  {path: 'chat', component: ChatComponentComponent },
  {path : 'login', component: LoginComponent},
  {path:'', component: LandingPageComponent},
  {path:'register', component: RegisterComponent},
  {path: 'request-list', component: RequestsListComponent},
  {path: 'request-detail', component : RequestDetailComponent},
  {path: 'aircrafts', component: AircraftListComponent},
  {path: 'add-aircraft', component: AddAircraftComponent},
  {path: 'edit-profile', component: EditProfileComponent},
  {path: 'users', component: UsersComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
