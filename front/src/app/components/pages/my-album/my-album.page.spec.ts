import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAlbumPage } from './my-album.page';

describe('MyAlbumPage', () => {
  let component: MyAlbumPage;
  let fixture: ComponentFixture<MyAlbumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyAlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
