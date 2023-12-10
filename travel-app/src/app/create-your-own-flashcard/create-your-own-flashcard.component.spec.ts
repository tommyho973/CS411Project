import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreateYourOwnFlashcardComponent } from './create-your-own-flashcard.component';

describe('CreateYourOwnFlashcardComponent', () => {
  let component: CreateYourOwnFlashcardComponent;
  let fixture: ComponentFixture<CreateYourOwnFlashcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule], // Import FormsModule for ngModel
      declarations: [CreateYourOwnFlashcardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateYourOwnFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle form submission', () => {
    // Assuming you have a submitFlashcard method in your component
    spyOn(component, 'submitFlashcard');

    // Simulate user input
    component.englishWord = 'Test Word';
    component.englishTranslation = 'Test Translation';
    component.translatedWord = 'Test Translated Word';
    component.translatedDefinition = 'Test Translated Definition';

    // Trigger the click event on the submit button
    const submitButton = fixture.debugElement.nativeElement.querySelector('button');
    submitButton.click();

    // Check if the submitFlashcard method is called
    expect(component.submitFlashcard).toHaveBeenCalled();
  });
});
