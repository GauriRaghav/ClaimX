import { Component, OnInit } from '@angular/core';
// import { UserRoleService } from './services/user-role.service';
import { UserRoleService } from './services/user-role.service.service';
import { ANavbarComponent } from './components/a-navbar/a-navbar.component';
import { UNavbarComponent } from './components/u-navbar/u-navbar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ANavbarComponent,UNavbarComponent,NavbarComponent,RouterOutlet,FooterComponent,CommonModule]
})
export class AppComponent implements OnInit {
  title="ClaimX";
  userRole: string = '';

  constructor(private userRoleService: UserRoleService) {}

  ngOnInit(): void {
    this.userRoleService.role$.subscribe(role => {
      this.userRole = role;
    });
  }
}
