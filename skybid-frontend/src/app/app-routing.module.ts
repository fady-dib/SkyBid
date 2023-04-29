import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponentComponent } from './pages/chat/chat-component.component';
import { LoginComponent } from './pages/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes = [
  { path: 'chat', component: ChatComponentComponent },
  { path : 'login', component: LoginComponent},
  {path:'', component: LandingPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
