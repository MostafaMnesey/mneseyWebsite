import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../../core/services/my-translate.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-section',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css',
})
export class AboutSectionComponent {
  currentLang = signal('');
  constructor(private mytranslate: MyTranslateService) {
    this.mytranslate.lang.subscribe((l) => {
      this.currentLang.set(l);
    });
  }
}
