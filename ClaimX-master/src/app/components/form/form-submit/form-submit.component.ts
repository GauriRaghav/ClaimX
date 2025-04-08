import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,ProgressBarComponent]
})
export class FormSubmitComponent implements OnInit {
  today!: string;
  declarationForm!: FormGroup;
  validationMessages: { [key: string]: string } = {};

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];

    this.declarationForm = this.fb.group({
      userAgreement: [false, Validators.requiredTrue],
      signature: [{ value: '', disabled: true }, Validators.required],
      submissionDate: [{ value: '', disabled: true }, Validators.required]
    });
  }

  toggleForm(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.declarationForm.get('signature')?.enable();
      this.declarationForm.get('submissionDate')?.enable();
    } else {
      this.declarationForm.get('signature')?.disable();
      this.declarationForm.get('submissionDate')?.disable();
    }
  }

  checkFieldValidity(field: string) {
    const control = this.declarationForm.get(field);
    this.validationMessages[field] = '';

    if (control && control.invalid && (control.dirty || control.touched || control.value === '')) {
      if (control.errors?.['required']) {
        this.validationMessages[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    }
  }

  submitDeclarationConsent(event: Event) {
    event.preventDefault();

    // Show errors for all required fields
    Object.keys(this.declarationForm.controls).forEach(field => {
      this.checkFieldValidity(field);
    });

    if (this.declarationForm.valid) {
      const declarationInfo = this.declarationForm.value;

      console.log('Declaration and Consent Submitted:', declarationInfo);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Declaration and consent submitted successfully!',
        showConfirmButton: false,
        timer: 2000,
        didClose: () => {
          this.router.navigate(['/another-route']); // Update this with your actual next route
        }
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields correctly.'
      });
    }
  }
}
