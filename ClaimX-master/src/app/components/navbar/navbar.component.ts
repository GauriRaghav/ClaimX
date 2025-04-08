import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userAvatar: string = 'assets/default-avatar.png';

  constructor(private router: Router) {}

  ngOnInit() {
    this.setUserAvatar();
  }

  setUserAvatar(): void {
    const isLoggedIn: boolean = false; // Replace with actual login check
    const userGender: string = 'male'; // Replace with real gender value
  
    if (!isLoggedIn) {
      this.userAvatar = 'assets/default-avatar.png';
    } else {
      this.userAvatar =
        userGender.toLowerCase() === 'female'
          ? 'assets/female-avatar.png'
          : 'assets/male-avatar.png';
    }
  }
  

  aboutus(): void {
    this.router.navigate(['/about-us']);
  }

  Login(): void {
    this.router.navigate(['/login']);
  }
}
