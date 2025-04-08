import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ClaimListComponent } from '../claim-list/claim-list.component';

type SortType = 'date' | 'amount';

@Component({
  selector: 'app-u-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ClaimListComponent],
  templateUrl: './u-dashboard.component.html',
  styleUrls: ['./u-dashboard.component.css']
})
export class UDashboardComponent {
  today!: string;
  isClicked: boolean = false;
  selectedTab: 'list' | 'approved' | 'rejected' | 'pending' = 'list';

  filterValues: {
    search: string;
    dateStart: string;
    dateEnd: string;
    amountMin: number | null;
    amountMax: number | null;
    location: string;
    sortBy: SortType;
  } = {
    search: '',
    dateStart: '',
    dateEnd: '',
    amountMin: null,
    amountMax: null,
    location: '',
    sortBy: 'date'
  };

  constructor(private router: Router) {}

  ngOnInit() {
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];
  }

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

  toggleFaq(faq: any) {
    faq.open = !faq.open;
  }

  applyFilters() {
    const searchRaw = (document.getElementById('searchClaims') as HTMLInputElement)?.value;
    const dateStart = (document.getElementById('filterDateStart') as HTMLInputElement)?.value;
    const dateEnd = (document.getElementById('filterDateEnd') as HTMLInputElement)?.value;
    const amountMinRaw = (document.getElementById('filterAmountMin') as HTMLInputElement)?.value;
    const amountMaxRaw = (document.getElementById('filterAmountMax') as HTMLInputElement)?.value;
    const locationRaw = (document.getElementById('filterLocation') as HTMLInputElement)?.value;
    const sortBy = (document.getElementById('sortClaims') as HTMLSelectElement)?.value as SortType;

    const search = searchRaw ? searchRaw.trim().toLowerCase() : '';
    const location = locationRaw ? locationRaw.trim().toLowerCase() : '';
    const amountMin = amountMinRaw ? parseFloat(amountMinRaw) : null;
    const amountMax = amountMaxRaw ? parseFloat(amountMaxRaw) : null;

    this.filterValues = {
      search,
      dateStart,
      dateEnd,
      amountMin: isNaN(amountMin!) ? null : amountMin,
      amountMax: isNaN(amountMax!) ? null : amountMax,
      location,
      sortBy
    };

    console.log('Filters applied:', this.filterValues);
  }

  navigateToClaimPage(): void {
    this.router.navigate(['/personal-info']);
  }

  changeTab(tab: 'list' | 'approved' | 'rejected' | 'pending') {
    this.selectedTab = tab;
  }
}
