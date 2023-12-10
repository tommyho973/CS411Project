import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent {
  userUid: string | null = null;
  flashcardList: any[] = [];
  constructor(private router: Router, public authService: AuthService) {
    authService.user$.subscribe((user) => {
      this.userUid = user ? user.uid : null;
    });
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
