import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserComponent } from './auth/user/user.component';
import { MissatgeComponent } from './missatge/missatge.component';
import { SalaComponent } from './sala/sala.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users/:id', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'sala', component: SalaComponent, canActivate: [AuthGuard] },
  { path: 'sales', component: SalaComponent, canActivate: [AuthGuard] },
  { path: 'xat/:id', component: MissatgeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
