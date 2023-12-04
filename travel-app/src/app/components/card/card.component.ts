import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() word: string = '';  // original word
  @Input() translatedWord: string = '';  // translated word

  showWord: boolean = false;  // state to toggle word visibility
  showTranslatedWord: boolean = false;  // state to toggle translated word visibility

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
}
