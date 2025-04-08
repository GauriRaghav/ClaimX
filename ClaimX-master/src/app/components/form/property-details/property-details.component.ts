import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProgressBarComponent],
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  propertyDetailsForm: FormGroup;
  isPreExistingDamageYes: boolean = false;
  isFormValid: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.propertyDetailsForm = this.fb.group({
      propertyType: ['', Validators.required],
      propertyOccupied: ['', Validators.required],
      preExistingDamage: ['', Validators.required],
      damageExplanation: [{ value: '', disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.propertyDetailsForm.valueChanges.subscribe(() => {
      this.checkFormValidity();
    });

    this.propertyDetailsForm.get('preExistingDamage')?.valueChanges.subscribe(value => {
      this.isPreExistingDamageYes = value === 'yes';
      const damageControl = this.propertyDetailsForm.get('damageExplanation');

      if (this.isPreExistingDamageYes) {
        damageControl?.enable();
        damageControl?.setValidators(Validators.required);
      } else {
        damageControl?.disable();
        damageControl?.clearValidators();
      }
      damageControl?.updateValueAndValidity();
      this.checkFormValidity();
    });
  }

  checkFormValidity() {
    this.isFormValid = this.propertyDetailsForm.valid;
  }

  onSubmit(): void {
    if (this.isFormValid) {
      console.log('Property Details Submitted:', this.propertyDetailsForm.value);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Property Details submitted successfully!',
        showConfirmButton: true,
        confirmButtonText: 'Continue to Damage Assessment',
        confirmButtonColor: '#3085d6'
      }).then(result => {
        if (result.isConfirmed) {
          this.router.navigate(['/damage-assessment']);
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
