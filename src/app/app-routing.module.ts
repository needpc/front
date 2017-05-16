import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ContactComponent} from './contact/contact.component';
import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   // redirectTo: 'home',
  //   component: AppComponent
  // },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
