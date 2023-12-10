import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register.component';
import { LoginComponent } from './auth/login.component';
import {AppComponent} from './app.component';
import { LogoutComponent } from './auth/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { AccountComponent } from './auth/account.component';
import { CreateYourOwnFlashcardComponent } from './create-your-own-flashcard/create-your-own-flashcard.component';
import { FlashcardPageComponent } from './components/pages/flashcard-page/flashcard-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: FlashcardPageComponent,canActivate:[AuthGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: 'account', component: AccountComponent },
  { path: 'create-your-own-flashcard', component: CreateYourOwnFlashcardComponent },
  // { path: 'app', component: FlashcardPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
