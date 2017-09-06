import { MaterializeModule } from 'ng2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollToModule} from 'ng2-scroll-to';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { ROUTES } from './app.routing';
import { HomeComponent } from './home/home.component';
import { ArticleListComponent } from './article-list/article-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    HomeComponent,
    ArticleListComponent
  ],
  imports: [
    MaterializeModule.forRoot(),
    CommonModule,
    ScrollToModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
