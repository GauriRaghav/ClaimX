import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-u-dashboard',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './u-dashboard.component.html',
  styleUrls: ['./u-dashboard.component.css']
})
export class UDashboardComponent {
  today!: string;
  isClicked: boolean = false;
  constructor(private router: Router) {}

  faqs = [
    { question: 'How do I file a claim?', answer: 'You can file a claim by clicking on the "File A Claim" button.', open: false },
    { question: 'What documents are required?', answer: 'You need to provide proof of loss, identity verification, and banking information.', open: false },
    { question: 'How long does it take to process a claim?', answer: 'Claims are typically processed within 7-10 business days.', open: false },
    { question: 'Can I edit my claim after submission?', answer: 'Yes, you can edit your claim within 14 days of the first submission.', open: false },
    { question: 'What if my claim is rejected?', answer: 'If your claim is rejected, you will receive a detailed explanation and can reapply with additional information.', open: false },
    { question: 'How do I track the status of my claim?', answer: 'You can track the status of your claim through the dashboard under "Pending Claims".', open: false },
    { question: 'What are the payment methods available?', answer: 'Payments can be made via direct bank transfer or other available methods.', open: false },
    { question: 'Who can I contact for support?', answer: 'You can contact our support team via email or phone for any assistance.', open: false }
  ];

  ngOnInit() {
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];
  }

  toggleFaq(faq: any) {
    faq.open = !faq.open;
  }

  applyFilters() {
    // Implement filter logic here
    console.log('Filters applied');
  }

  navigateToClaimPage(): void {
    this.router.navigate(['/personal-info']); // Replace '/claim-page' with your actual route
  }

}