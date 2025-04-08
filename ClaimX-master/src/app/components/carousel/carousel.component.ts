import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  imports: [CommonModule]
})
export class CarouselComponent {
  slides = [
    {
      title: 'Quick & Easy Claims',
      description: 'Streamlined flood insurance claims in just a few steps.',
      image: '../../../assets/images/carousel-claims.png'
    },
    {
      title: 'Real-time Claim Tracking',
      description: 'Monitor your claim progress live from anywhere.',
      image: '../../../assets/images/carousel-track.png'
    },
    {
      title: 'Support that Cares',
      description: 'Our team is here for you when it matters most.',
      image: '../../../assets/images/carousel-support.png'
    },
    {
      title: 'Trusted by Thousands',
      description: 'ClaimX is trusted by families and agents across India.',
      image: '../../../assets/images/carousel-trusted.png'
    }
  ];
}
