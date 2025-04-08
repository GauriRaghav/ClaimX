import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-auth-wrapper',
  imports: [LoginComponent,SignupComponent],
  templateUrl: './auth-wrapper.component.html',
  styleUrl: './auth-wrapper.component.css'
})
export class AuthWrapperComponent {

}
