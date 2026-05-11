import { Component, inject, Input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-faq',
  imports: [TranslatePipe],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
})
export class FaqComponent {
  @Input() productDetails: any;
  sanitizer = inject(DomSanitizer);
  activeIndex = signal<number | null>(null);

  toggleAccordion(index: number) {
    this.activeIndex.set(this.activeIndex() === index ? null : index);
  }

  sanitizeAnswer(answer: string): string {
    return answer
      .replace(/&nbsp;/g, ' ')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .trim();
  }

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
