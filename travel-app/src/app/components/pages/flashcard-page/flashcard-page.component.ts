import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-flashcard-page',
  templateUrl: './flashcard-page.component.html',
  styleUrls: ['./flashcard-page.component.css']
})
export class FlashcardPageComponent {
  userUid: string | null = null;

  constructor(private router: Router,public authService: AuthService) {
    authService.user$.subscribe((user) => {
      this.userUid = user ? user.uid : null;
    });
  }
  
  // Method to navigate to the registration component
  navigateToRegistration() {
    this.router.navigate(['/register']);
  }

  navigateToCreateYourOwn(){
    this.router.navigate(['/create-your-own-flashcard']);
  }

  fetchFlashcard() {
    const selectedLanguage = (document.getElementById('language') as HTMLInputElement)?.value;
    const url = `http://localhost:5000/api/word-info?email=${this.userUid}&language=${selectedLanguage}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.showFlashcard(data); // Call the showFlashcard method of the component
      })
      .catch(error => console.error('Error fetching flashcard data:', error));
  }
  showFlashcard(data: { original_word: string, original_definition: string, translated_word: string, translated_definition: string }) {
    const flashcardContainer = document.getElementById('flashcard');
  
    // Check if there is data to display
    if (data && flashcardContainer!==null) {
      // Clear previous content in the flashcard container
  
      // Create and append flashcard content
      const originalWord = document.createElement('div');
      originalWord.innerText = `Original Word: ${data.original_word}`;
  
      const originalDefinition = document.createElement('div');
      originalDefinition.innerText = `Original Definition: ${data.original_definition}`;
  
      const translatedWord = document.createElement('div');
      translatedWord.innerText = `Translated Word: ${data.translated_word}`;
  
      const translatedDefinition = document.createElement('div');
      translatedDefinition.innerText = `Translated Definition: ${data.translated_definition}`;
  
      flashcardContainer.appendChild(originalWord);
      flashcardContainer.appendChild(originalDefinition);
      flashcardContainer.appendChild(translatedWord);
      flashcardContainer.appendChild(translatedDefinition);
    } else if(flashcardContainer !== null) {
      // Display a message if there is no data
      flashcardContainer.innerHTML = 'No flashcard data available.';
    }
    else{
      console.error('No data or flashcardContainer is null.');
    }
  }
}
