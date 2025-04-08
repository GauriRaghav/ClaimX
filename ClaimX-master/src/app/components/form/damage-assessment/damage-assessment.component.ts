import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';

@Component({
  selector: 'app-damage-assessment',
  standalone: true,
  imports: [FormsModule, CommonModule, ProgressBarComponent],
  templateUrl: './damage-assessment.component.html',
  styleUrls: ['./damage-assessment.component.css']
})
export class DamageAssessmentComponent {
  selectedFiles: File[] = [];
  selectedDamageTypes: string[] = [];
  repairCost: number = 0;
  isFormValid: boolean = false;

  constructor(private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newFiles = Array.from(input.files);
      this.selectedFiles = [...this.selectedFiles, ...newFiles];
    }
  }

  toggleDamageType(type: string, isChecked: boolean): void {
    if (isChecked) {
      if (!this.selectedDamageTypes.includes(type)) {
        this.selectedDamageTypes.push(type);
      }
    } else {
      this.selectedDamageTypes = this.selectedDamageTypes.filter(t => t !== type);
    }
    this.checkFormValidity();
  }

  checkFormValidity(): void {
    const isAnyCheckboxChecked = this.selectedDamageTypes.length > 0;
    const isRepairCostValid = this.repairCost > 0;

    this.isFormValid = isAnyCheckboxChecked && isRepairCostValid;
    this.displayValidationMessages(isAnyCheckboxChecked, isRepairCostValid);
  }

  displayValidationMessages(isAnyCheckboxChecked: boolean, isRepairCostValid: boolean): void {
    const checkboxesWarning = document.querySelector('.checkbox-group .warning') as HTMLElement;
    const repairCostWarning = document.querySelector('#repairCost + .warning') as HTMLElement;

    if (checkboxesWarning) {
      checkboxesWarning.textContent = isAnyCheckboxChecked ? '' : 'Please select at least one type of damage.';
    }

    if (repairCostWarning) {
      repairCostWarning.textContent = isRepairCostValid ? '' : 'Please enter a valid repair cost.';
    }
  }
  onCheckboxChange(event: Event, value: string): void {
    const checkbox = event.target as HTMLInputElement;
    this.toggleDamageType(value, checkbox.checked);
  }

  onSubmit(): void {
    this.checkFormValidity();

    if (this.isFormValid) {
      const damageAssessmentDetails = {
        selectedDamageTypes: this.selectedDamageTypes,
        repairCost: this.repairCost,
        selectedFiles: this.selectedFiles.map(file => file.name)
      };

      console.log('Damage Assessment Submitted:', damageAssessmentDetails);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Damage assessment submitted successfully! Continue to next page.',
        showConfirmButton: true,
        confirmButtonText: 'Go to Witness Info',
        confirmButtonColor: '#3085d6'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/witness-info']);
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
