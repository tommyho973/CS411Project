import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';
import {AppComponent} from './app.component';
import { LogoutComponent } from './auth/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { AccountComponent } from './auth/account.component';
const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' }, {path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent },
{ path: 'app', component: AppComponent,canActivate:[AuthGuard] },
{ path: 'logout', component: LogoutComponent },
{ path: 'account', component: AccountComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
