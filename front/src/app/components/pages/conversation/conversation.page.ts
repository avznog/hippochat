import { Component, OnInit } from '@angular/core';
import { PublicProfileService } from 'src/app/services/publicProfile/public-profile.service';
import { SocketPublicProfileService } from 'src/app/services/sockets/socket-public-profile/socket-public-profile.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

  constructor(
    public readonly publicProfileService: PublicProfileService,
    private socketPublicProfileService: SocketPublicProfileService, // ? leave for socket listener initalization

  ) {

   }

  ngOnInit() { }

}
