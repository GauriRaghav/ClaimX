import { Component } from '@angular/core';

@Component({
  selector: 'app-a-dashboard',
  imports: [],
  templateUrl: './a-dashboard.component.html',
  styleUrl: './a-dashboard.component.css'
})
export class ADashboardComponent {
  submitBankingInformation(event: Event) {
    event.preventDefault();
    // Handle banking information submission logic here
    alert('Banking information submitted successfully!');
  }

}
