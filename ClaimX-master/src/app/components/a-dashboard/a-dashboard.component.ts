import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-a-dashboard',
  imports: [RouterModule],
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
