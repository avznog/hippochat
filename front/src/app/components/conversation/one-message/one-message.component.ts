import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Message } from 'src/app/models/message.model';
import invert, { RGB, RgbArray, HexColor, BlackWhite } from 'invert-color';

@Component({
  selector: 'app-one-message',
  templateUrl: './one-message.component.html',
  styleUrls: ['./one-message.component.scss'],
  imports: [IonicModule, CommonModule],
  standalone: true
})
export class OneMessageComponent implements OnInit {

  class = ""
  constructor(
    public readonly authService: AuthService
  ) {
  }

  @Input() message!: Message;

  ngOnInit() {
    this.class = `${this.authService.currentUserSubject.getValue().id === this.message.mate.id ? 'rounded-br-none ' : 'rounded-bl-none'} `
  }

  getReverseColor(color: string) {
    return invert(color, true);
  }

}
