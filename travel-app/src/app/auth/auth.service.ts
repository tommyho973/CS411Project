// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { BehaviorSubject,Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    public isLoggedIn$ = this.isLoggedInSubject.asObservable();
    private apiUrl = 'http://127.0.0.1:5000';
    user$: Observable<firebase.default.User | null>;
  
    constructor(private afAuth: AngularFireAuth, private http: HttpClient, private router: Router) {
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
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
          this.isLoggedInSubject.next(true);
          this.router.navigate(['/home']).then(() => {
            console.error('Navigation to /home successful');
          }).catch(error => {
            console.error('Navigation to /home failed:', error);
          });
          console.error('Login successful');
        })
        .catch(error => {
          console.error('Login failed:', error);
          // Handle login failure (e.g., display an error message)
        });
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
    addWordtoDatabase(uid: string, data: any){
      const user = {uid,data};
      return this.http.post('http://127.0.0.1:5000/api/add-to-list', user);
    }
    getFlashcardList(email:string){
      const params = {"email":email};
      return this.http.get('http://127.0.0.1:5000/api/flashcard-list', { params });
    }
    logout(): Promise<void> {
      return this.afAuth.signOut().then(() => {
        this.isLoggedInSubject.next(false);
      });
    }

  }