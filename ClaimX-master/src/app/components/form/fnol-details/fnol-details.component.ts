import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from "../../progress-bar/progress-bar.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fnol-details',
  standalone: true,
  imports: [FormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './fnol-details.component.html',
  styleUrls: ['./fnol-details.component.css']
})
export class FnolDetailsComponent {
  dateTimeNoticed: string = '';
  reportedMethod: string = '';
  immediateActions: string = '';
  today: string = '';
  isFormValid: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const now = new Date();
    this.today = now.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
  }

  checkFormValidity() {
    this.isFormValid = !!(this.dateTimeNoticed && this.reportedMethod.trim() && this.immediateActions.trim());
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const fnolDetails = {
        dateTimeNoticed: this.dateTimeNoticed,
        reportedMethod: this.reportedMethod,
        immediateActions: this.immediateActions
      };
      console.log('FNOL Details Submitted:', fnolDetails);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'First Notice of Loss details submitted successfully!',
        confirmButtonText: 'Go to Property Details',
        confirmButtonColor: '#3085d6'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/property-details']);
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
