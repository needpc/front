import { MaterializeModule } from 'ng2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrollToModule} from 'ng2-scroll-to';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ROUTES } from './app.routing';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { myService } from './data.service';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

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
    HttpClientModule,
    NgHttpLoaderModule,
    HttpModule
  ],
  providers: [myService],
  bootstrap: [AppComponent]
})
export class AppModule { }
