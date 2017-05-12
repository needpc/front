import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TestComponent } from './test.component';
// Routing Module
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
  BrowserModule,
  FormsModule,
  HttpModule,
  AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
