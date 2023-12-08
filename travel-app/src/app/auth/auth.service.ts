// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { BehaviorSubject,Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    public isLoggedIn$ = this.isLoggedInSubject.asObservable();
    private apiUrl = 'http://127.0.0.1:5000';
    user$: Observable<firebase.default.User | null>;
  
    constructor(private afAuth: AngularFireAuth,private http: HttpClient) {
      this.user$ = this.afAuth.authState;
      this.afAuth.authState.subscribe((user) => {
        this.isLoggedInSubject.next(!!user);
      });
    }
  
    isUserLoggedIn(): Observable<boolean> {
      return this.afAuth.authState.pipe(
        map((user) => {
          // Check if the user is logged in
          return !!user;
        })
      );
    }

    loginWithEmailPassword(email: string, password: string) {
      const login = this.afAuth.signInWithEmailAndPassword(email, password);
      this.isLoggedInSubject.next(true);
      return login
    }

    registerWithEmailPassword(email: string, password: string) {
        return this.afAuth.createUserWithEmailAndPassword(email, password);
      }
    sendUserInfoToMongoDB(uid: string,  email: string): Observable<any> {
        const user = { uid, email };
        return this.http.post('http://127.0.0.1:5000/api/register', user);
    }
    getNewWord(email: string, language: string){
      const params = {"email":email, "language":language,};
      return this.http.get('http://127.0.0.1:5000/api/word-info', { params });
    }
    logout() {
      this.afAuth.signOut();
      this.isLoggedInSubject.next(false);
    }

  }