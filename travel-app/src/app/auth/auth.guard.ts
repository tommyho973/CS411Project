import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import  auth  from 'firebase/compat/app';

@Injectable({
    providedIn: 'root',
  })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
      return this.afAuth.authState.pipe(
        take(1),
        map(user => {
          if (user) {
            // User is authenticated, allow access to the route
            return true;
          } else {
            // User is not authenticated, redirect to the login page
            return this.router.createUrlTree(['/login']);
          }
        })
      );
    }
  }