import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-create-your-own-flashcard',
  templateUrl: './create-your-own-flashcard.component.html',
  styleUrls: ['./create-your-own-flashcard.component.css'],
})
export class CreateYourOwnFlashcardComponent {
  englishWord: string = '';
  englishTranslation: string = '';
  translatedWord: string = '';
  translatedDefinition: string = '';
  userUid: string | null = null;

  constructor(private router: Router,public authService: AuthService) {
    authService.user$.subscribe((user) => {
      this.userUid = user ? user.uid : null;
    });
  }

  submitFlashcard() {
    // Handle the submission logic here, e.g., send the data to the server
    this.englishWord = (document.getElementById('englishWord') as HTMLInputElement)?.value;
    this.englishTranslation = (document.getElementById('englishDefinition') as HTMLInputElement)?.value;
    this.translatedWord = (document.getElementById('translatedWord') as HTMLInputElement)?.value;
    this.translatedDefinition = (document.getElementById('translatedDefinition') as HTMLInputElement)?.value;
    const data = {
      original_definition: this.englishTranslation,
      original_word: this.englishWord,
      translated_definition: this.translatedDefinition,
      translated_word: this.translatedWord,
    };
    if(this.userUid!=null){
      this.authService.addWordtoDatabase(this.userUid,data)
                .subscribe(
                  (response) => {
                    console.log('Info sent to database:', response);
                  },
                  (error) => {
                    console.error('Failed to send user information to MongoDB:', error);
                  }
                );
    
  }
}

}
