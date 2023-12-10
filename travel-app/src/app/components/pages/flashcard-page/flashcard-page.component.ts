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
  flashcardList: any[] = [];
  constructor(private router: Router, public authService: AuthService) {
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
    if (data && flashcardContainer !== null) {
      // Clear previous content in the flashcard container
      while (flashcardContainer.firstChild) {
        flashcardContainer.removeChild(flashcardContainer.firstChild);
      }
  
      // Create and append flashcard content
      const originalWord = document.createElement('div');
      originalWord.innerText = `Original Word: ${data.original_word}`;
      originalWord.className = 'original-word';
      originalWord.style.backgroundColor="black";
      originalWord.style.color="white";
      originalWord.style.width="50%";
      originalWord.style.textAlign="center";
      originalWord.style.marginLeft="auto";
      originalWord.style.marginRight="auto";
      originalWord.style.fontSize="calc(10px + 2vh)";
      originalWord.style.fontWeight="bold";
      originalWord.style.padding="2vh 1vw";
  
      const originalDefinition = document.createElement('div');
      originalDefinition.className = 'original-def';
      originalDefinition.innerText = `Original Definition: ${data.original_definition}`;
      originalDefinition.style.marginBottom="5vh";
      originalDefinition.style.width="50%";
      originalDefinition.style.textAlign="justify";
      originalDefinition.style.marginLeft="auto";
      originalDefinition.style.marginRight="auto";
      originalDefinition.style.marginTop="2vh";

      const translatedWord = document.createElement('div');
      translatedWord.className = 'translated-word';
      translatedWord.innerText = `Translated Word: ${data.translated_word}`;
      translatedWord.style.backgroundColor="black";
      translatedWord.style.color="white";
      translatedWord.style.width="50%";
      translatedWord.style.textAlign="center";
      translatedWord.style.marginLeft="auto";
      translatedWord.style.marginRight="auto";
      translatedWord.style.fontSize="calc(10px + 2vh)";
      translatedWord.style.fontWeight="bold";
      translatedWord.style.padding="2vh 1vw";
  
      const translatedDefinition = document.createElement('div');
      translatedDefinition.innerText = `Translated Definition: ${data.translated_definition}`;
      translatedDefinition.className = 'translated-def';
      translatedDefinition.innerText = `Original Definition: ${data.original_definition}`;
      translatedDefinition.style.width="50%";
      translatedDefinition.style.textAlign="justify";
      translatedDefinition.style.marginLeft="auto";
      translatedDefinition.style.marginRight="auto";
      translatedDefinition.style.marginTop="2vh";
  
      flashcardContainer.appendChild(originalWord);
      flashcardContainer.appendChild(originalDefinition);
      flashcardContainer.appendChild(translatedWord);
      flashcardContainer.appendChild(translatedDefinition);
    } else if (flashcardContainer !== null) {
      // Display a message if there is no data
      flashcardContainer.innerHTML = 'No flashcard data available.';
    } else {
      console.error('No data or flashcardContainer is null.');
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
}
