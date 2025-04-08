import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';

@Component({
  selector: 'app-banking-info',
  templateUrl: './banking-info.component.html',
  styleUrls: ['./banking-info.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ProgressBarComponent]
})
export class BankingInfoComponent implements OnInit {
  bankingForm!: FormGroup;
  validationMessages: { [key: string]: string } = {};

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.bankingForm = this.fb.group({
      accountHolderName: ['', Validators.required],
      bankName: ['', Validators.required],
      bankBranchName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      ifscCode: ['', Validators.required],
      bankAddress: [''],
      paymentPreference: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      proofOfOwnership: ['', Validators.required],
      identityVerification: ['', Validators.required],
      paymentDescription: ['', Validators.required],
      taxInformation: ['', Validators.required]
    });

    this.addValidationListeners();
  }

  addValidationListeners() {
    Object.keys(this.bankingForm.controls).forEach(field => {
      const control = this.bankingForm.get(field);
      if (control) {
        // Handle real-time + blur validation
        control.valueChanges.subscribe(() => this.checkFieldValidity(field));
        control.statusChanges.subscribe(() => this.checkFieldValidity(field));
      }
    });
  }

  checkFieldValidity(field: string) {
    const control = this.bankingForm.get(field);
    this.validationMessages[field] = '';

    if (control && control.invalid && (control.dirty || control.touched)) {
      if (control.errors?.['required']) {
        this.validationMessages[field] = `${this.toSentenceCase(field)} is required.`;
      } else if (control.errors?.['email']) {
        this.validationMessages[field] = `Please enter a valid email.`;
      } else if (control.errors?.['pattern'] && field === 'contactPhone') {
        this.validationMessages[field] = `Phone number must be exactly 10 digits.`;
      }
    }
  }

  toSentenceCase(text: string): string {
    return text.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }

  submitBankingInformation(event: Event) {
    event.preventDefault();

    if (this.bankingForm.valid) {
      console.log('Banking Information Submitted:', this.bankingForm.value);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Banking information submitted successfully! Continue to next page.',
        showConfirmButton: true,
        confirmButtonText: 'Banking information submitted successfully!',
        confirmButtonColor: '#3085d6'
      }).then(() => {
        this.router.navigate(['/form-submit']);
      });
    } else {
      // Mark all fields as touched to trigger errors
      Object.keys(this.bankingForm.controls).forEach(field => {
        const control = this.bankingForm.get(field);
        control?.markAsTouched();
        control?.updateValueAndValidity();
        this.checkFieldValidity(field);
      });

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all required fields correctly.'
      });
    }
  }
}
