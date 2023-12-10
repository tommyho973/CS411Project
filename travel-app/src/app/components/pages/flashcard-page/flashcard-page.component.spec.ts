import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardPageComponent } from './flashcard-page.component';

describe('FlashcardPageComponent', () => {
  let component: FlashcardPageComponent;
  let fixture: ComponentFixture<FlashcardPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlashcardPageComponent]
    });
    fixture = TestBed.createComponent(FlashcardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
