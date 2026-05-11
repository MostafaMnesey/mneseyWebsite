import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../../core/services/my-translate.service';

@Component({
  selector: 'app-suitable-slider',
  imports: [NgStyle, TranslatePipe],
  templateUrl: './suitable-slider.component.html',
  styleUrl: './suitable-slider.component.css',
})
export class SuitableSliderComponent {
  currentIndex2: number = 0;
  totalSlides2: number = 3;
  currentLang = signal('');

  constructor(
    private translate: TranslateService,
    private mytranslate: MyTranslateService,
  ) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
  }
  nextSlide2() {
    if (this.currentIndex2 < this.totalSlides2 - 1) {
      this.currentIndex2++;
    } else {
      this.currentIndex2 = 0;
    }
  }

  prevSlide2() {
    if (this.currentIndex2 > 0) {
      this.currentIndex2--;
    } else {
      this.currentIndex2 = this.totalSlides2 - 1;
    }
  }
}
