import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponentComponent } from './pages/chat/chat-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { DrawerComponent } from './components/drawer/drawer.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { RequestsListComponent } from './pages/requests-list/requests-list.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { RequestDetailComponent } from './pages/request-detail/request-detail.component';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { AircraftListComponent } from './pages/aircraft-list/aircraft-list.component';
import { AddAircraftComponent } from './pages/add-aircraft/add-aircraft.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { SideMenuComponent } from './pages/side-menu/side-menu.component';





@NgModule({
  declarations: [
    AppComponent,
    ChatComponentComponent,
    LoginComponent,
    HeaderComponent,
    LandingPageComponent,
    RegisterComponent,
    DrawerComponent,
    RequestsListComponent,
    RequestDetailComponent,
    AircraftListComponent,
    AddAircraftComponent,
    EditProfileComponent,
    SideMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonsModule,
    DropDownsModule,
    NotificationModule,
    LayoutModule,
    GridModule,
    NavigationModule,
    DialogsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
