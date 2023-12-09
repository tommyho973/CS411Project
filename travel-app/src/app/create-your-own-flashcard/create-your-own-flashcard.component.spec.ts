import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateYourOwnFlashcardComponent } from './create-your-own-flashcard.component';

describe('CreateYourOwnFlashcardComponent', () => {
  let component: CreateYourOwnFlashcardComponent;
  let fixture: ComponentFixture<CreateYourOwnFlashcardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateYourOwnFlashcardComponent],
    });
    fixture = TestBed.createComponent(CreateYourOwnFlashcardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display front and back text', () => {
    component.frontText = 'Front Text';
    component.backText = 'Back Text';
    fixture.detectChanges();
    const frontElement = fixture.nativeElement.querySelector('.front');
    const backElement = fixture.nativeElement.querySelector('.back');
    expect(frontElement.textContent).toContain('Front Text');
    expect(backElement.textContent).toContain('Back Text');
  });
});

