import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyMatePage } from './my-mate.page';

describe('MyMatePage', () => {
  let component: MyMatePage;
  let fixture: ComponentFixture<MyMatePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyMatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
