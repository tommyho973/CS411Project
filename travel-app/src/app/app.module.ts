import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { FirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { LogoutComponent } from './auth/logout.component';
import { AccountComponent } from './auth/account.component';
import { AuthGuard } from './auth/auth.guard';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { WordListComponent } from './components/word-list/word-list.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const firebaseConfig = {
  apiKey: "AIzaSyAA9BqT2s9cE8ExpBeXNhb7rfexg2i-rNw",
  authDomain: "languagelogin-53aef.firebaseapp.com",
  projectId: "languagelogin-53aef",
  storageBucket: "languagelogin-53aef.appspot.com",
  messagingSenderId: "393887629758",
  appId: "1:393887629758:web:adc0ece906532bdead39ef",
  measurementId: "G-WQ7Z1QYJ8J"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    AccountComponent,
    CardComponent,
    WordListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp({"projectId":"languagelogin-53aef","appId":"1:393887629758:web:adc0ece906532bdead39ef","storageBucket":"languagelogin-53aef.appspot.com","apiKey":"AIzaSyAA9BqT2s9cE8ExpBeXNhb7rfexg2i-rNw","authDomain":"languagelogin-53aef.firebaseapp.com","messagingSenderId":"393887629758","measurementId":"G-WQ7Z1QYJ8J"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FormsModule,
    AngularFireAuthModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
