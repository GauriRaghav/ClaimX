import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupMethod: string = 'phoneNumber';
  phoneNumber: string = '';
  userEmail: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordLengthValid: boolean = false;
  passwordNumberValid: boolean = false;
  passwordSpecialCharValid: boolean = false;
  passwordUppercaseValid: boolean = false;
  passwordsMatch: boolean = false;

  constructor(private router: Router) {}

  validatePassword() {
    this.passwordLengthValid = this.password.length >= 8;
    this.passwordNumberValid = /\d/.test(this.password);
    this.passwordSpecialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
    this.passwordUppercaseValid = /[A-Z]/.test(this.password);
    this.checkPasswordMatch();
  }

  checkPasswordMatch() {
    this.passwordsMatch = this.password === this.confirmPassword;
  }

  isFormValid() {
    return this.passwordLengthValid && this.passwordNumberValid && this.passwordSpecialCharValid && this.passwordUppercaseValid && this.passwordsMatch;
  }

  onSignUp() {
    if (this.isFormValid()) {
      // Handle sign-up logic here
      console.log('Sign Up:', this.signupMethod === 'phoneNumber' ? this.phoneNumber : this.userEmail, this.password);
      this.router.navigate(['/login']); // Navigate to another route after successful sign-up
    } else {
      alert('Please ensure all password requirements are met and passwords match.');
    }
  }
}