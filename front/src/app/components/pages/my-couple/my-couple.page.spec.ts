import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyCouplePage } from './my-couple.page';

describe('MyCouplePage', () => {
  let component: MyCouplePage;
  let fixture: ComponentFixture<MyCouplePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyCouplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
