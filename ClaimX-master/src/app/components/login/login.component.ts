import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserRoleService } from '../../services/user-role.service.service'; // adjust the path

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ This enables [(ngModel)]
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userType: string = '';
  email: string = '';
  password: string = '';
  isFormValid: boolean = false;

  constructor(
    private router: Router,
    private userRoleService: UserRoleService
  ) {}

  login(): void {
    if (this.userType === 'claimAdjuster') {
      this.userRoleService.setRole('adjuster');
      this.router.navigate(['/a-dashboard']);
    } else {
      this.userRoleService.setRole('user');
      this.router.navigate(['/u-dashboard']);
    }
  }

  logout(): void {
    this.userRoleService.setRole('');
    this.router.navigate(['/auth-wrapper']);
  }

  checkFormValidity(): void {
    this.isFormValid = this.email.trim() !== '' && this.password.trim() !== '';
  }
}
