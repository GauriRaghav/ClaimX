import {
  Component,
  Input,
  ViewChildren,
  ViewChild,
  ElementRef,
  QueryList,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements AfterViewInit {
  @Input() currentStep = 0;
  @Input() steps: string[] = [];

  @ViewChildren('circleRef', { read: ElementRef }) circleRefs!: QueryList<ElementRef>;
  @ViewChild('progressContainer', { static: true }) progressContainer!: ElementRef;

  fillWidth = '0px';

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.calculateFillWidth();
    this.cdr.detectChanges();
  }

  calculateFillWidth(): void {
    if (!this.circleRefs || this.circleRefs.length === 0 || this.currentStep <= 0) {
      this.fillWidth = '0px';
      return;
    }

    const activeIndex = this.currentStep - 1;
    const circle = this.circleRefs.get(activeIndex)?.nativeElement;
    const container = this.progressContainer?.nativeElement;

    if (circle && container) {
      const containerLeft = container.getBoundingClientRect().left;
      const circleCenter =
        circle.getBoundingClientRect().left - containerLeft + circle.offsetWidth / 2;

      this.fillWidth = `${circleCenter}px`;
    }
  }
}
