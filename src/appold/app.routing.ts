import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

//Layouts
import { TestComponent }            from './test.component';

export const routes: Routes = [
{
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
},
{
    path: 'test',
    component: TestComponent
}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
