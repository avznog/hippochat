import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Keyboard } from '@capacitor/keyboard';
import { Toast } from '@capacitor/toast';
import { ChangelogsService } from 'src/app/services/changelogs/changelogs.service';
import { AuthService } from '../auth.service';
import { Platform } from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  boyImg = "../../../assets/login-icons/home-bodies.webp";
  returnUrl!: string;
  loading: boolean = false;
  error: null | string = null;
  data: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public readonly changelogsService: ChangelogsService,
    private readonly platform: Platform
  ) {
    this.data = localStorage.getItem("currentUser");
    console.log("DATA : " + this.data)
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      pseudo: ["", Validators.required],
      password: ["", Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home'
  }

  showKeyboard = () => Keyboard.show();

  hideKeyboard = () => Keyboard.hide();

  async onSubmit() {
    // ? hiding keyboard
    this.hideKeyboard();

    if (this.loginForm.invalid)
      return;

    this.loading = true;

    try {
      await this.authService.login(this.loginForm.value["pseudo"], this.loginForm.value["password"]);
      this.router.navigate([this.returnUrl]);
      // this.loading = false;
      // ? success vibration on success login
      Haptics.notification({ type: NotificationType.Success })

    } catch (error) {
      this.error = error as string;

      // ? toast with the error message
      Toast.show({
        text: this.error,
        duration: "long"
      }).finally(() => {
        this.loading = false;

        // ? small vibration on failure login
        Haptics.notification({ type: NotificationType.Error })
      });
    }
  }

  get f() { return this.loginForm.controls; }

  onRegister() {
    Haptics.impact({
      style: ImpactStyle.Medium
    });
    this.router.navigate(["/register"])
  }

  getPlatform(): 'ios' | 'web' | 'android' {
    if (this.platform.is("ios") || this.platform.is("ipad") || this.platform.is("iphone")) return "ios"
    else if (this.platform.is("android")) return "android"
    else return "web"
  }
}
