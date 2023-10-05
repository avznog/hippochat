import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import * as moment from 'moment-timezone';
import { AuthService } from 'src/app/auth/auth.service';
import { Sex } from 'src/app/constants/sex.type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm!: UntypedFormGroup;
  notifyImg = "../../../../../assets/register-icons/notify-heart-dynamic-color.webp";
  loading: boolean = false;
  gender: Sex | null = null;
  timezone: string = "";
  allTimezones: string[] = moment.tz.names();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      age: [0, [Validators.required, Validators.min(0)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(8)]],
      timezone: ["", Validators.required]
    },
      {
        validators: this.ConfirmedValidator("password", "confirmPassword")
      })
  }

  async onSubmit() {
    Haptics.impact({
      style: ImpactStyle.Medium
    });

    if (this.registerForm.invalid)
      return

    this.loading = true;
    await this.authService.register({
      email: this.registerForm.value["email"],
      firstname: this.registerForm.value["firstname"],
      lastname: this.registerForm.value["lastname"],
      age: this.registerForm.value["age"],
      password: this.registerForm.value["password"],
      timezone: this.timezone
    },
      this.gender!);
    this.loading = false;
  }

  get f() { return this.registerForm.controls; }


  ConfirmedValidator(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {

      const control = formGroup.controls[controlName];

      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {

        return;

      }

      if (control.value !== matchingControl.value) {

        matchingControl.setErrors({ confirmedValidator: true });

      } else {

        matchingControl.setErrors(null);

      }

    }
  }

  onChangeGender(e: any) {
    this.gender = e.detail.value;
  }

  onChangeTimezone(e: any) {
    this.timezone = e.detail.value;
  }

}
