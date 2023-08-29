import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoodboardPage } from './moodboard.page';

describe('MoodboardPage', () => {
  let component: MoodboardPage;
  let fixture: ComponentFixture<MoodboardPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MoodboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
