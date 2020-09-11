import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication.component';
import {BookListComponent} from './book-list/book-list.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {BookAddComponent} from './book-add/book-add.component';

const routes: Routes = [
  {path: '', component: BookListComponent},
  {path: 'login', component: AuthenticationComponent},
  {path: 'add', component: BookAddComponent},
  {path: 'error', component: ErrorPageComponent, data: {message: 'Page not found!'}},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
