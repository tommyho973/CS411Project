import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  userUid: string | null = null;
  flashcardList: any[] = [];
  currentIndex: number = 0;
  originalWord: string = '';
  originalDefinition: string = '';
  translatedWord: string = '';
  translatedDefinition: string = '';

  showWord: boolean = false;  // state to toggle word visibility
  showTranslatedWord: boolean = false;  // state to toggle translated word visibility

  constructor(private authService: AuthService) {
    authService.user$.subscribe((user) => {
      this.userUid = user ? user.uid : null;
    });
  }

  ngOnInit(): void {
    this.getFlashcardData();
  }

  toggleWord(): void {
    this.showWord = !this.showWord;  // toggle visibility of the original word
  }

  toggleTranslatedWord(): void {
    this.showTranslatedWord = !this.showTranslatedWord;  // toggle visibility of the translated word
  }

  toggleBoth(): void {
    if (this.showWord || this.showTranslatedWord) {
      // if either text is visible, hide both
      this.showWord = false;
      this.showTranslatedWord = false;
    } 
    else {
      // if both are hidden, show both
      this.showWord = true;
      this.showTranslatedWord = true;
    }
  }

  fetchFlashcard() {
    const selectedLanguage = (document.getElementById('language') as HTMLInputElement)?.value;
    const url = `http://localhost:5000/api/word-info?email=${this.userUid}&language=${selectedLanguage}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.flashcardList.push(data); // Add the new flashcard to the list
        this.displayLastFlashcard(); // Display the last (newly fetched) flashcard
      })
      .catch(error => console.error('Error fetching flashcard data:', error));
  }

  showFlashcard(data: { original_word: string, original_definition: string, translated_word: string, translated_definition: string }) {
    // Update the properties with the data
    this.originalWord = data.original_word;
    this.originalDefinition = data.original_definition;
    this.translatedWord = data.translated_word;
    this.translatedDefinition = data.translated_definition;
  }

  getFlashcardData(){
    if(this.userUid!=null){
      const url = `http://localhost:5000/api/flashcard-list?email=${this.userUid}`;
      fetch(url)
    .then(response => response.json())
    .then((data) => {
      this.flashcardList = data.result; // Assuming the array is nested under 'result'
      console.log(this.flashcardList);
    })
    .catch((error) =>
      console.error('Error fetching flashcard data:', error)
    );

  }
  }

  displayLastFlashcard(): void {
    this.currentIndex = this.flashcardList.length - 1;
    this.displayFlashcard(this.currentIndex);
  }

  displayPreviousFlashcard(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.displayFlashcard(this.currentIndex);
    }
  }

  displayFlashcard(index: number): void {
    const flashcard = this.flashcardList[index];
    if (flashcard) {
      this.originalWord = flashcard.original_word;
      this.originalDefinition = flashcard.original_definition;
      this.translatedWord = flashcard.translated_word;
      this.translatedDefinition = flashcard.translated_definition;
    }
  }
}
