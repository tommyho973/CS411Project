// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://127.0.0.1:5000';
    user$: Observable<firebase.default.User | null>;
  
    constructor(private afAuth: AngularFireAuth,private http: HttpClient) {
      this.user$ = afAuth.authState;
    }
  

    loginWithEmailPassword(email: string, password: string) {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    registerWithEmailPassword(email: string, password: string) {
        return this.afAuth.createUserWithEmailAndPassword(email, password);
      }
    sendUserInfoToMongoDB(uid: string, displayName: string, email: string): Observable<any> {
        const user = { uid, displayName, email };
        return this.http.post('http://127.0.0.1:5000/api/register', user);
    }
    logout() {
      this.afAuth.signOut();
    }
  }