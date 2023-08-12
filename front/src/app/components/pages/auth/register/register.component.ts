import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  registerForm!: UntypedFormGroup;
  notifyImg = "../../../../../assets/register-icons/notify-heart-dynamic-color.png";
  loading: boolean = false;

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
      confirmPassword: ["", [Validators.required, Validators.minLength(8)]]
    },
    {
      validators: this.ConfirmedValidator("password", "confirmPassword")
    })
  }

  async onSubmit() {
    if(this.registerForm.invalid)
      return 
    
    this.loading = true;
    await this.authService.register({
      email: this.registerForm.value["email"],
      firstname: this.registerForm.value["firstname"],
      lastname: this.registerForm.value["lastname"],
      age: this.registerForm.value["age"],
      password: this.registerForm.value["password"],
    });
    this.loading = false;
  }

  get f() { return this.registerForm.controls; }


  ConfirmedValidator(controlName: string, matchingControlName: string){

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

}
