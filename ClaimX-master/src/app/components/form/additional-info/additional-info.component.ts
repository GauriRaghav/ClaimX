import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css'],
  imports: [ProgressBarComponent]
})
export class AdditionalInfoComponent {
  additionalDetails: string = '';

  constructor(private router: Router) {}

  submitAdditionalInformation(event: Event) {
    event.preventDefault();
    // Handle additional information submission logic here
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Additional information submitted successfully!'
    }).then(() => {
      this.router.navigate(['/banking-info']);
    });
  }
}