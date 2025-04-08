import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../../progress-bar/progress-bar.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incident-details',
  standalone: true,
  imports: [FormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetailsComponent {
  dateOfLoss: string = '';
  timeOfLoss: string = '';
  locationOfIncident: string = '';
  causeOfLoss: string = '';
  descriptionOfDamages: string = '';
  today: string = new Date().toISOString().split('T')[0];
  isFormValid: boolean = false;

  constructor(private router: Router) {}

  checkFormValidity() {
    this.isFormValid =
      !!this.dateOfLoss &&
      !!this.locationOfIncident &&
      !!this.causeOfLoss &&
      !!this.descriptionOfDamages;
  }

  onSubmit() {
    this.checkFormValidity(); // Ensure latest values are validated

    if (this.isFormValid) {
      const incidentDetails = {
        dateOfLoss: this.dateOfLoss,
        timeOfLoss: this.timeOfLoss,
        locationOfIncident: this.locationOfIncident,
        causeOfLoss: this.causeOfLoss,
        descriptionOfDamages: this.descriptionOfDamages
      };
      console.log('Incident Details Submitted:', incidentDetails);
      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Incident details submitted successfully!',
        showConfirmButton: true,
        confirmButtonText: 'Go to FNOL Details',
        confirmButtonColor: '#3085d6'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/fnol-details']);
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
