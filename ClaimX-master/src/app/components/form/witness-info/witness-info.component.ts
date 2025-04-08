import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';

@Component({
  selector: 'app-witness-info',
  standalone: true,
  imports: [FormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './witness-info.component.html',
  styleUrls: ['./witness-info.component.css']
})
export class WitnessInfoComponent {
  witnessName: string = '';
  witnessAge: number | null = null;
  witnessGender: string = '';
  witnessContact: string = '';
  witnessAddress: string = '';
  witnessStatement: string = '';
  validationMessages: { [key: string]: string } = {};

  constructor(private router: Router) {}

  checkFieldValidity(field: string) {
    this.validationMessages[field] = '';

    if (field === 'witnessName' && !this.witnessName) {
      this.validationMessages[field] = 'Witness name is required.';
    }

    if (field === 'witnessAge') {
      if (this.witnessAge === null || this.witnessAge < 5) {
        this.validationMessages[field] = 'Witness age must be at least 5.';
      }
    }

    if (field === 'witnessGender' && !this.witnessGender) {
      this.validationMessages[field] = 'Witness gender is required.';
    }

    if (field === 'witnessContact') {
      const contactPattern = /^\d{10}$/;
      if (!this.witnessContact || !contactPattern.test(this.witnessContact)) {
        this.validationMessages[field] = 'Contact information must be a 10-digit number.';
      }
    }

    if (field === 'witnessAddress' && !this.witnessAddress) {
      this.validationMessages[field] = 'Witness address is required.';
    }
  }

  checkFormValidity() {
    this.checkFieldValidity('witnessName');
    this.checkFieldValidity('witnessAge');
    this.checkFieldValidity('witnessGender');
    this.checkFieldValidity('witnessContact');
    this.checkFieldValidity('witnessAddress');

    return Object.values(this.validationMessages).every(message => message === '');
  }

  submitWitnessInformation(event: Event) {
    event.preventDefault();
    if (this.checkFormValidity()) {
      const witnessInfo = {
        witnessName: this.witnessName,
        witnessAge: this.witnessAge,
        witnessGender: this.witnessGender,
        witnessContact: this.witnessContact,
        witnessAddress: this.witnessAddress,
        witnessStatement: this.witnessStatement
      };
      console.log('Witness Information Submitted:', witnessInfo);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Witness information submitted successfully!'
      }).then(() => {
        this.router.navigate(['/insurance-details']);
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