import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'articleList', component: ArticleListComponent },
  // redirect to home when route does not exists (must be last route)
  { path: '**', redirectTo: 'home' },
];
