import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnChanges {
  @Input() tab: 'list' | 'approved' | 'rejected' | 'pending' = 'list';
  @Input() searchText: string = '';
  @Input() filterStartDate: string = '';
  @Input() filterEndDate: string = '';
  @Input() filterMinAmount: number | null = null;
  @Input() filterMaxAmount: number | null = null;
  @Input() filterLocation: string = '';
  @Input() sortBy: 'amount' | 'date' = 'date';

  claims = [
    { claimNo: 'CLM001', name: 'John Doe', fileDate: '2024-04-01', amount: 15000, location: 'New York', relation: 'Self', status: 'Approved' },
    { claimNo: 'CLM002', name: 'Jane Smith', fileDate: '2024-03-15', amount: 22000, location: 'California', relation: 'Spouse', status: 'Pending' },
    { claimNo: 'CLM003', name: 'Michael Johnson', fileDate: '2024-02-10', amount: 8000, location: 'Texas', relation: 'Child', status: 'Rejected' },
    { claimNo: 'CLM004', name: 'Emily Davis', fileDate: '2024-01-05', amount: 19500, location: 'Florida', relation: 'Parent', status: 'Approved' },
    { claimNo: 'CLM005', name: 'Daniel Brown', fileDate: '2024-04-03', amount: 25000, location: 'Illinois', relation: 'Self', status: 'Pending' },
    { claimNo: 'CLM006', name: 'Sophia Wilson', fileDate: '2024-03-01', amount: 12500, location: 'Nevada', relation: 'Sibling', status: 'Rejected' },
    { claimNo: 'CLM007', name: 'William Taylor', fileDate: '2024-02-21', amount: 18000, location: 'Washington', relation: 'Spouse', status: 'Approved' },
    { claimNo: 'CLM008', name: 'Olivia Martinez', fileDate: '2024-03-28', amount: 9800, location: 'Arizona', relation: 'Child', status: 'Pending' },
    { claimNo: 'CLM009', name: 'James Anderson', fileDate: '2024-01-15', amount: 30000, location: 'Colorado', relation: 'Parent', status: 'Approved' },
    { claimNo: 'CLM010', name: 'Ava Thomas', fileDate: '2024-04-05', amount: 14500, location: 'Georgia', relation: 'Self', status: 'Rejected' }
  ];

  filteredClaims: any[] = [];

  ngOnChanges(): void {
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.claims];
    console.log('Original Claims:', result);
  
    // Tab filter
    if (this.tab !== 'list') {
      result = result.filter(claim => claim.status.toLowerCase() === this.tab);
      console.log('After Tab Filter:', result);
    }
  
    // Search filter
    if (this.searchText.trim()) {
      const text = this.searchText.toLowerCase();
      result = result.filter(claim =>
        claim.name.toLowerCase().includes(text) ||
        claim.claimNo.toLowerCase().includes(text)
      );
      console.log('After Search Filter:', result);
    }
  
    // Date range filter
    if (this.filterStartDate) {
      result = result.filter(claim => claim.fileDate >= this.filterStartDate);
      console.log('After Start Date Filter:', result);
    }
    if (this.filterEndDate) {
      result = result.filter(claim => claim.fileDate <= this.filterEndDate);
      console.log('After End Date Filter:', result);
    }
  
    // Amount range filter
    if (this.filterMinAmount !== null && !isNaN(this.filterMinAmount)) {
      result = result.filter(claim => claim.amount >= this.filterMinAmount!);
      console.log('After Min Amount Filter:', result);
    }
    if (this.filterMaxAmount !== null && !isNaN(this.filterMaxAmount)) {
      result = result.filter(claim => claim.amount <= this.filterMaxAmount!);
      console.log('After Max Amount Filter:', result);
    }
  
    // Location filter
    if (this.filterLocation.trim()) {
      const loc = this.filterLocation.toLowerCase();
      result = result.filter(claim => claim.location.toLowerCase().includes(loc));
      console.log('After Location Filter:', result);
    }
  
    // Sort
    if (this.sortBy === 'amount') {
      result.sort((a, b) => b.amount - a.amount);
      console.log('Sorted by Amount:', result);
    } else {
      result.sort((a, b) =>
        new Date(b.fileDate).getTime() - new Date(a.fileDate).getTime()
      );
      console.log('Sorted by Date:', result);
    }
  
    this.filteredClaims = result;
    console.log('Final Filtered Claims:', this.filteredClaims);
  }
}
