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

  @Input() word: string = '';  // original word
  @Input() translatedWord: string = '';  // translated word

  showWord: boolean = false;  // state to toggle word visibility
  showTranslatedWord: boolean = false;  // state to toggle translated word visibility

  constructor(private router: Router, public authService: AuthService) {
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
      this.word = flashcard.original_word;
      this.translatedWord = flashcard.translated_word;
    }
  }
}
