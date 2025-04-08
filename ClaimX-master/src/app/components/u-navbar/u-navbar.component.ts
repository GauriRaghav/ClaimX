import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserRoleService } from '../../services/user-role.service.service';

@Component({
  selector: 'app-u-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './u-navbar.component.html',
  styleUrls: ['./u-navbar.component.css']
})
export class UNavbarComponent {
  constructor(
    private router: Router,
    private userRoleService: UserRoleService // ✅ injected properly
  ) {}

  logout(): void {
    this.userRoleService.setRole('');
    this.router.navigate(['/']);
  }
}
