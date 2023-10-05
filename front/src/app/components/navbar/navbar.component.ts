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
export class NavbarComponent implements OnInit {
  conversationOnIcon = "../../../assets/tabs-icons/notify-heart-dynamic-color.webp";
  conversationOffIcon = "../../../assets/tabs-icons/notify-heart-dynamic-premium.webp";
  calendarsOnIcon = "../../../assets/tabs-icons/calender-dynamic-color.webp";
  calendarsOffIcon = "../../../assets/tabs-icons/calender-dynamic-premium.webp";
  myCoupleOnIcon = "../../../assets/tabs-icons/heart-dynamic-color.webp";
  myCoupleOffIcon = "../../../assets/tabs-icons/heart-dynamic-premium.webp";
  myAlbumOnIcon = "../../../assets/tabs-icons/picture-dynamic-color.webp";
  myAlbumOffIcon = "../../../assets/tabs-icons/picture-dynamic-premium.webp";

  constructor(
    public router: Router,
    public readonly authService: AuthService
  ) { }

  ngOnInit() { }

  onClickTab() {
    Haptics.impact({
      style: ImpactStyle.Light
    })
  }

}
