import { MaterializeModule } from 'ngx-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollToModule } from 'ng2-scroll-to';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { ROUTES } from './app.routing';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { HomeComponent } from './home/home.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { CookieService } from 'ngx-cookie-service';
import { Globals } from './globals';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { NgxGaugeModule } from 'ngx-gauge';
import { DisqusModule } from "ngx-disqus";
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { AboutUsComponent } from './about-us/about-us.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    HomeComponent,
    ArticleListComponent,
    AboutUsComponent
  ],
  imports: [
    MaterializeModule.forRoot(),
    CommonModule,
    ScrollToModule.forRoot(),
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    HttpClientModule,
    NgHttpLoaderModule,
    HttpModule,
    NgSelectModule,
    FormsModule,
    RoundProgressModule,
    DisqusModule.forRoot('needpctest'),
    NgxGaugeModule,
    NgxPaginationModule
  ],
  providers: [
    CookieService,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
