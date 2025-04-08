import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../../progress-bar/progress-bar.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [FormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {
  fullName: string = '';
  policyNumber: string = '';
  contactNumber: string = '';
  emailAddress: string = '';
  mailingAddress: string = '';

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const personalInfo = {
        fullName: this.fullName,
        policyNumber: this.policyNumber,
        contactNumber: this.contactNumber,
        emailAddress: this.emailAddress,
        mailingAddress: this.mailingAddress
      };

      console.log('Personal Information Submitted:', personalInfo);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Personal information submitted successfully!',
        showConfirmButton: true,
        confirmButtonText: 'Go to Incident Details',
        confirmButtonColor: '#3085d6'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/incident-details']);
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
