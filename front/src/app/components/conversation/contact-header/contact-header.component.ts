import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NativeService } from 'src/app/services/native/native.service';
import { PublicProfileService } from 'src/app/services/publicProfile/public-profile.service';

@Component({
  selector: 'app-contact-header',
  templateUrl: './contact-header.component.html',
  styleUrls: ['./contact-header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ContactHeaderComponent  implements OnInit {

  constructor(
    public readonly nativeService: NativeService,
    public readonly publicProfileService: PublicProfileService
  ) { 
    this.publicProfileService.getMyMatesPublicProfile()
    this.nativeService.getLocation();
  }

  ngOnInit() {}

}
