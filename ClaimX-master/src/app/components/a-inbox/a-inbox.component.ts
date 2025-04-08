import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-a-inbox',
  imports: [CommonModule],
  templateUrl: './a-inbox.component.html',
  styleUrl: './a-inbox.component.css'
})
export class AInboxComponent  {
  notifications: string[] = [];

  ngOnInit(): void {
    // Simulated API call
    setTimeout(() => {
      this.notifications = [
        'Claim #12345 has been reviewed.',
        'New message from support team.',
        'Claim #56789 is awaiting your response.'
      ];
    }, 1000);
  }
}
