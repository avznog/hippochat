import { Component, OnInit } from '@angular/core';
import { PublicProfileService } from 'src/app/services/publicProfile/public-profile.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  constructor(
    public readonly publicProfileService: PublicProfileService
  ) {

   }

  ngOnInit() { }

}
