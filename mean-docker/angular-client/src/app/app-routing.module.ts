import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { LoginComponent } from './users/login.component';
import { HomeComponent } from './home/home.component';
//import { PageNotFoundComponent } from './pagenotfound/pageNotFound.component';
 
const routes: Routes= [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    //{ path: '**', component: PageNotFoundComponent } 
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]   
})

export class AppRoutingModule{ }