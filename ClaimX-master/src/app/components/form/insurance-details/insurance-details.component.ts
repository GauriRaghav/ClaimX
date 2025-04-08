import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';

@Component({
  selector: 'app-insurance-details',
  standalone: true,
  imports: [FormsModule, CommonModule,ProgressBarComponent],
  templateUrl: './insurance-details.component.html',
  styleUrls: ['./insurance-details.component.css']
})
export class InsuranceDetailsComponent {
  policyStartDate: string = '';
  policyEndDate: string = '';
  otherInsurance: string = '';
  otherInsuranceDetails: string = '';
  isFormValid: boolean = false;
  validationMessages: { [key: string]: string } = {};

  constructor(private router: Router) {}

  checkFormValidity() {
    this.validationMessages = {};

    const startDate = new Date(this.policyStartDate);
    const endDate = new Date(this.policyEndDate);
    const today = new Date();

    if (!this.policyStartDate) {
      this.validationMessages['policyStartDate'] = 'Policy start date is required.';
    } else if (startDate > today) {
      this.validationMessages['policyStartDate'] = 'Policy start date cannot be in the future.';
    }

    if (!this.policyEndDate) {
      this.validationMessages['policyEndDate'] = 'Policy end date is required.';
    } else if (endDate <= startDate) {
      this.validationMessages['policyEndDate'] = 'Policy end date must be later than the start date.';
    }

    if (!this.otherInsurance) {
      this.validationMessages['otherInsurance'] = 'Please select an option for other insurance.';
    }

    if (this.otherInsurance === 'yes' && !this.otherInsuranceDetails) {
      this.validationMessages['otherInsuranceDetails'] = 'Please provide details for other insurance.';
    }

    this.isFormValid = Object.keys(this.validationMessages).length === 0;
  }

  onSubmit() {
    if (this.isFormValid) {
      const insuranceDetails = {
        policyStartDate: this.policyStartDate,
        policyEndDate: this.policyEndDate,
        otherInsurance: this.otherInsurance,
        otherInsuranceDetails: this.otherInsuranceDetails
      };
      console.log('Insurance Details Submitted:', insuranceDetails);
      Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Insurance Details submitted successfully!'
            }).then(() => {
              this.router.navigate(['/additional-info']);
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