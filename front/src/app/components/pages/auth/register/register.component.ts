import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  registerForm!: UntypedFormGroup;
  notifyImg = "../../../../../assets/register-icons/notify-heart-dynamic-color.png";

  constructor(
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ["", Validators.required]
    })
  }

  onSubmit() {
    console.log("good")
  }

}
