import { Component, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GalleriaModule } from 'primeng/galleria';
import { Subject, takeUntil } from 'rxjs';
import { MyTranslateService } from '../core/services/my-translate.service';

@Component({
  selector: 'app-galleria',
  imports: [GalleriaModule],
  templateUrl: './galleria.component.html',
  styleUrl: './galleria.component.css',
})
export class GalleriaComponent {
  slides: any[] = [];
  currentLang = signal('');

  private destroy$ = new Subject<void>();
  constructor(
    private translate: TranslateService,
    private mytranslate: MyTranslateService,
  ) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
  }

  responsiveOptions: any[] = [
    {
      breakpoint: '1300px',
      numVisible: 4,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];
  ngOnInit(): void {
    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadSlides();
    });

    // Load slides initially
    this.loadSlides();
  }

  private loadSlides() {
    this.translate.get('home.productsSlider.slides').subscribe((slides) => {
      this.slides = slides || [];
    });
  }
}
