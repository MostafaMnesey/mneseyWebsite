import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { MyTranslateService } from '../../../core/services/my-translate.service';
import { isPlatformBrowser, NgIf, NgTemplateOutlet } from '@angular/common';
import { Button, ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule } from 'primeng/carousel';
interface Test {
  imgSrc: string;
  title: string;
  description: string;
  Button: string;
  link: string;
}
@Component({
  selector: 'app-features-section',
  imports: [
    ButtonModule,
    RouterLink,
    TranslatePipe,
    CarouselModule,
    NgIf,
    NgTemplateOutlet,
  ],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.css',
})
export class FeaturesSectionComponent {
  id = inject(PLATFORM_ID);
  currentLang = signal('');

  tests: Test[] = [
    {
      imgSrc: 'new/Symptom Checker.webp',
      title: 'home.features.symptomChecker.title',
      description: 'home.features.symptomChecker.description',
      Button: 'home.features.symptomChecker.buttonText',
      link: '/symptom-checker-v2',
    },
    {
      imgSrc: 'new/Blink Test.webp',
      title: 'home.features.blinkTest.title',
      description: 'home.features.blinkTest.description',
      Button: 'home.features.blinkTest.buttonText',
      link: 'https://blinktest.mentholatumarabia.com/',
    },
  ];
  responsiveOptions = [
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  constructor(private mytranslate: MyTranslateService) {
    this.mytranslate.lang.subscribe((l) => {
      this.currentLang.set(l);
    });
  }

  openBlink() {
    if (isPlatformBrowser(this.id)) {
      window.open('https://blinktest.mentholatumarabia.com', '_self');
    }
  }
}
