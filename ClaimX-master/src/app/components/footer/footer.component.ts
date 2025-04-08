import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private router: Router) {}

  submitFeedback(event: Event): void {
    event.preventDefault();

    Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      text: 'Your feedback has been submitted successfully.',
      confirmButtonColor: '#2a9d8f'
    });

    const form = event.target as HTMLFormElement;
    form.reset();
  }

  navigateTo(route: string): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => this.router.navigate(['/' + route]), 300);
  }
}
