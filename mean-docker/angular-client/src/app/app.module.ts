import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ProgrammService } from './services/programm.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './users/login.component';
//import { PageNotFoundComponent } from './pagenotfound/pageNotFound.component';
import { AppRoutingModule } from './app-routing.module';

const appRoutes: Routes = [
  { path: '', component: AppComponent},
  { path: 'users', component: UsersComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'users/inscription', component: InscriptionComponent },
  //{ path: 'chaine', component: ChannelComponent },
  //{ path: 'prog', component: ProgComponent },
  //{ path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    //PageNotFoundComponent,
    UsersComponent,
    HomeComponent
  ],
  providers: [ ProgrammService ], 
  exports: [ RouterModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
