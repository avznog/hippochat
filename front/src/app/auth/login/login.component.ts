import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Keyboard } from '@capacitor/keyboard';
import { AuthService } from '../auth.service';
import { Toast } from '@capacitor/toast';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  boyImg = "../../../assets/login-icons/home-bodies.png";
  returnUrl!: string;
  loading: boolean = false;
  error: null | string = null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home'
  }

  get f() { return this.loginForm.controls }

  showKeyboard = () => Keyboard.show();

  hideKeyboard = () => Keyboard.hide();

  async onSubmit() {
    if (this.loginForm.invalid)
      return;

    this.loading = true;
    Haptics.impact({ style: ImpactStyle.Medium })
    try {
      await this.authService.login(this.loginForm.value["email"], this.loginForm.value["password"]);
      this.router.navigate([this.returnUrl]);
      this.loading = false;
      Haptics.notification({type: NotificationType.Success})
    } catch (error) {
      console.log("ERRRRRROR")
      this.error = error as string;
      Toast.show({
        text: this.error,
        duration: "long"
      }).finally(() => {
        this.loading = false;
        Haptics.notification({type: NotificationType.Error})
      });
    }
  }
}
