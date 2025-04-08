import { Component, AfterViewInit } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CarouselComponent, RouterModule],
  standalone: true
})
export class HomeComponent implements AfterViewInit {

  constructor(private router: Router) {}

  Login(): void {
    this.router.navigate(['/login']);
  }

  Signup(): void {
    this.router.navigate(['/signup']);
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
          (entry.target as HTMLElement).style.animationDelay = `${index * 0.2}s`;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.feature-card').forEach(el => {
      observer.observe(el);
    });
  }
}
