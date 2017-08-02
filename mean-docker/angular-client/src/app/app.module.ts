import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToTopDirective } from './toTop.directive';
import { ShowDirective } from './show.directive';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    ToTopDirective,
    ShowDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
