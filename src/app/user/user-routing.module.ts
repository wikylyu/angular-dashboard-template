import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserListPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
