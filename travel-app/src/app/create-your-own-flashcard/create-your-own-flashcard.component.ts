import { Component } from '@angular/core';

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

  submitFlashcard() {
    // Handle the submission logic here, e.g., send the data to the server
    console.log('Submitted Flashcard:', {
      englishWord: this.englishWord,
      englishTranslation: this.englishTranslation,
      translatedWord: this.translatedWord,
      translatedDefinition: this.translatedDefinition,
    });
  }
}
