import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'a-claim-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './a-claim-list.component.html',
  styleUrls: ['./a-claim-list.component.css']
})
export class AClaimListComponent implements OnInit, OnChanges {
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tabParam = params['tab'] as 'list' | 'approved' | 'rejected' | 'pending';
      if (tabParam) {
        this.tab = tabParam;
      }
      this.applyFilters();
    });
  }

  ngOnChanges(): void {
    this.applyFilters();
  }
  onStatusChange(claim: any) {
    console.log(`Status for ${claim.claimNo} changed to ${claim.status}`);
    // Optionally reapply filters if needed
    this.applyFilters();
  }
  

  applyFilters() {
    let result = [...this.claims];

    if (this.tab !== 'list') {
      result = result.filter(claim => claim.status.toLowerCase() === this.tab);
    }

    if (this.searchText.trim()) {
      const text = this.searchText.toLowerCase();
      result = result.filter(claim =>
        claim.name.toLowerCase().includes(text) ||
        claim.claimNo.toLowerCase().includes(text)
      );
    }

    if (this.filterStartDate) {
      result = result.filter(claim => claim.fileDate >= this.filterStartDate);
    }

    if (this.filterEndDate) {
      result = result.filter(claim => claim.fileDate <= this.filterEndDate);
    }

    if (this.filterMinAmount !== null && !isNaN(this.filterMinAmount)) {
      result = result.filter(claim => claim.amount >= this.filterMinAmount!);
    }

    if (this.filterMaxAmount !== null && !isNaN(this.filterMaxAmount)) {
      result = result.filter(claim => claim.amount <= this.filterMaxAmount!);
    }

    if (this.filterLocation.trim()) {
      const loc = this.filterLocation.toLowerCase();
      result = result.filter(claim => claim.location.toLowerCase().includes(loc));
    }

    if (this.sortBy === 'amount') {
      result.sort((a, b) => b.amount - a.amount);
    } else {
      result.sort((a, b) =>
        new Date(b.fileDate).getTime() - new Date(a.fileDate).getTime()
      );
    }

    this.filteredClaims = result;
  }
  confirmStatusChange(event: Event, claim: any) {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;
  
    if (newStatus === claim.status) return; // No change
  
    Swal.fire({
      title: 'Confirm Status Change',
      html: `
        <p>Are you sure you want to change the status of <strong>${claim.name}</strong> (Claim No: <strong>${claim.claimNo}</strong>)?</p>
        <p>Current Status: <strong>${claim.status}</strong> → <strong>${newStatus}</strong></p>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, change it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        claim.status = newStatus;
        this.applyFilters(); // Update filtered list
        Swal.fire('Updated!', 'Claim status has been updated.', 'success');
      } else {
        // Revert the dropdown to original value
        selectElement.value = claim.status;
      }
    });
  }
  
}
