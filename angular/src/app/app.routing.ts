import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'article', component: ArticleComponent },
  // redirect to home when route does not exists (must be last route)
  { path: '**', redirectTo: 'home' },
];
