import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-one-message',
  templateUrl: './one-message.component.html',
  styleUrls: ['./one-message.component.scss'],
  standalone: true
})
export class OneMessageComponent implements OnInit {

  constructor(
    public readonly authService: AuthService
  ) { }

  @Input() message!: Message;

  ngOnInit() { }

}
