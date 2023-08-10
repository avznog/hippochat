import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Keyboard } from '@capacitor/keyboard';
import { Toast } from '@capacitor/toast';
import { AuthService } from '../auth.service';

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

  showKeyboard = () => Keyboard.show();

  hideKeyboard = () => Keyboard.hide();

  async onSubmit() {
    // ? small vibration on click on the button
    Haptics.impact({ style: ImpactStyle.Medium })


    // ? hiding keyboard
    this.hideKeyboard();

    if (this.loginForm.invalid)
      return;

    this.loading = true;

    try {
      await this.authService.login(this.loginForm.value["email"], this.loginForm.value["password"]);
      this.router.navigate([this.returnUrl]);
      this.loading = false;

      // ? success vibration on success login
      Haptics.notification({type: NotificationType.Success})

    } catch (error) {
      this.error = error as string;

      // ? toast with the error message
      Toast.show({
        text: this.error,
        duration: "long"
      }).finally(() => {
        this.loading = false;

        // ? small vibration on failure login
        Haptics.notification({type: NotificationType.Error})
      });
    }
  }
  
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

  onRegister() {
    Haptics.impact({
      style: ImpactStyle.Medium
    });
    this.router.navigate(["/register"])
  }
}
