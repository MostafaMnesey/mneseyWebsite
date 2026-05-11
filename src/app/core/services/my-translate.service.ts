import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private renderer2 = inject(RendererFactory2).createRenderer(null, null);
  private platId = inject(PLATFORM_ID);
  lang: BehaviorSubject<string> = new BehaviorSubject('en'); // Initialize with default value

  constructor(public translate: TranslateService) {
    let initialLang = 'en'; // Default language

    if (isPlatformBrowser(this.platId)) {
      const storedLang = localStorage.getItem('lang');
      if (storedLang) {
        initialLang = storedLang;
        if (initialLang == 'en') {
          this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
        } else {
          this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
        }
      }
    }

    this.lang.next(initialLang);
    this.translate.setDefaultLang('en');

    setTimeout(() => {
      this.translate.use(initialLang);
      this.changeDirection();
    }, 0);
  }

  changeDirection() {
    if (isPlatformBrowser(this.platId)) {
      const currentLang = this.lang.value;

      if (currentLang === 'en') {
        this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
        this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
      } else if (currentLang === 'ar') {
        this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
        this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
      }
    }
  }

  changeLang(lang: string) {
    if (isPlatformBrowser(this.platId)) {
      localStorage.setItem('lang', lang);
    }
    window.location.reload();
    this.lang.next(lang);
    this.translate.use(lang);
    this.changeDirection();
  }
}
