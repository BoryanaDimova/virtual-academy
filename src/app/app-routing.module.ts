import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { HomeComponent} from './_components/home/home.component';

const usersService = () => import('./_services/user.service').then(x => x.UserService);

// const routes: Routes = [
//   { path: '', component: HomeComponent, canActivate: [AuthGuard] },
//   { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
//   { path: 'account', loadChildren: accountModule },
//
//   // otherwise redirect to home
//   { path: '**', redirectTo: '' }
// ];

/*@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})*/
export class AppRoutingModule {}
