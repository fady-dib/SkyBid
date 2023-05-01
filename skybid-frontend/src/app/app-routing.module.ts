import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponentComponent } from './pages/chat/chat-component.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { RequestsListComponent } from './pages/requests-list/requests-list.component';
import { RequestDetailComponent } from './pages/request-detail/request-detail.component';

const routes = [
  { path: 'chat', component: ChatComponentComponent },
  { path : 'login', component: LoginComponent},
  {path:'', component: LandingPageComponent},
  {path:'register', component: RegisterComponent},
  {path: 'drawer', component: DrawerComponent},
  {path: 'request-list', component: RequestsListComponent},
  {path: 'request-detail', component : RequestDetailComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
