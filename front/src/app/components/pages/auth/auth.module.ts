import { NgModule } from "@angular/core";
import { NoMateComponent } from "./no-mate/no-mate.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  declarations: [RegisterComponent, NoMateComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { }
