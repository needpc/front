import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'articleList', component: ArticleListComponent },
  { path: 'about-us', component: AboutUsComponent },
  // redirige sur la home quand la route n'existe pas
  { path: '**', redirectTo: 'home' },
];
