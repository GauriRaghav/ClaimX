import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from '../../services/user-role.service.service';

@Component({
  selector: 'app-a-navbar',
  templateUrl: './a-navbar.component.html',
  styleUrls: ['./a-navbar.component.css']
})
export class ANavbarComponent {
  constructor(
    private router: Router,
    private userRoleService: UserRoleService // ✅ Add this
  ) {}

  logout(): void {
    this.userRoleService.setRole('');
    this.router.navigate(['/']);
  }
}
