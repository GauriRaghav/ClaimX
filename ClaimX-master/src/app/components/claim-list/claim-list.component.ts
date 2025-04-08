import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-claim-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {
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
  pageTitle = 'Claim List';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const status = params.get('status');

      if (status && status !== 'list') {
        const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
        this.pageTitle = `${formattedStatus} Claims`;
        this.filteredClaims = this.claims.filter(claim => claim.status.toLowerCase() === formattedStatus.toLowerCase());
      } else {
        this.pageTitle = 'Claim List';
        this.filteredClaims = [...this.claims];
      }
    });
  }
}
