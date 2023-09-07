import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    IonicModule]
})
export class NavbarComponent  implements OnInit {
  conversationOnIcon = "../../../assets/tabs-icons/notify-heart-dynamic-color.png";
  conversationOffIcon = "../../../assets/tabs-icons/notify-heart-dynamic-premium.png";
  calendarsOnIcon = "../../../assets/tabs-icons/calender-dynamic-color.png";
  calendarsOffIcon = "../../../assets/tabs-icons/calender-dynamic-premium.png";
  myCoupleOnIcon = "../../../assets/tabs-icons/heart-dynamic-color.png";
  myCoupleOffIcon = "../../../assets/tabs-icons/heart-dynamic-premium.png";
  myAlbumOnIcon = "../../../assets/tabs-icons/picture-dynamic-color.png";
  myAlbumOffIcon = "../../../assets/tabs-icons/picture-dynamic-premium.png";

  constructor(
    public router: Router,
    public readonly authService: AuthService
  ) { }

  ngOnInit() {}

  onClickTab() {
    Haptics.impact({
      style: ImpactStyle.Light
    })
  }

}
