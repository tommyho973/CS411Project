import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordListComponent } from './word-list.component';

describe('WordListComponent', () => {
  let component: WordListComponent;
  let fixture: ComponentFixture<WordListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WordListComponent]
    });
    fixture = TestBed.createComponent(WordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
