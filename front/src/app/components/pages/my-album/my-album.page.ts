import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-album.page.html',
  styleUrls: ['./my-album.page.scss'],
})
export class MyAlbumPage implements OnInit {

  constructor(
  ) { }
  @ViewChild(IonModal) modal?: IonModal;
  presentingElement?: any;

  ngOnInit() {
    this.presentingElement = document.querySelector('.content');
  }
}
