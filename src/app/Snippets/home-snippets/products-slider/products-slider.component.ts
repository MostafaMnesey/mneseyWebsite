import { inject, ViewEncapsulation } from '@angular/core';
// products-slider.component.ts
import { Router, RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { Component, OnInit, signal, OnDestroy } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { MyTranslateService } from '../../../core/services/my-translate.service';
import { GalleriaModule } from 'primeng/galleria';

interface SlideData {
  title: string;
  image: string;
  routerLink: string;
  vectorImage: string;
  slideClass: string;
}

@Component({
  selector: 'app-products-slider',
  imports: [RouterLink, TranslatePipe, GalleriaModule],
  templateUrl: './products-slider.component.html',
  styleUrl: './products-slider.component.css',
  encapsulation: ViewEncapsulation.None, // Use None to avoid encapsulation issues with styles
})
export class ProductsSliderComponent implements OnInit, OnDestroy {
  slides: SlideData[] = [];
  currentLang = signal('');

  // Galleria configuration
  galleriaResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private mytranslate: MyTranslateService,
  ) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
  }

  ngOnInit(): void {
    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadSlides();
    });

    // Load slides initially
    this.loadSlides();
  }

  private loadSlides() {
    this.translate.get('home.productsSlider.slides').subscribe((slides) => {
      // Map your slides data to include all necessary information
      this.slides = [
        {
          title: slides[0]?.title || 'Deep Freeze',
          image: 'images/new-slider-imgs/deep freeze.png',
          routerLink: '/brand/24',
          vectorImage: 'images/slider vectors/Vector (2).png',
          slideClass: 'slide-1 radial',
        },
        {
          title: slides[1]?.title || 'Deep Heat',
          image: 'images/new-slider-imgs/deep heat.png',
          routerLink: '/brand/23',
          vectorImage: 'images/slider vectors/Vector (3).png',
          slideClass: 'slide-2 radial-2',
        },
        {
          title: slides[2]?.title || 'Hada Labo',
          image: 'images/new-slider-imgs/hada labo.png',
          routerLink: '/brand/26',
          vectorImage: 'images/slider vectors/Vector (4).png',
          slideClass: 'slide-3 radial-3',
        },
        {
          title: slides[3]?.title || 'Deep Relief',
          image: 'images/new-slider-imgs/deep relief.png',
          routerLink: '/brand/25',
          vectorImage: 'images/slider vectors/Vector (5).png',
          slideClass: 'slide-4 radial-4',
        },
        {
          title: slides[0]?.title || 'Rohto',
          image: 'images/new-slider-imgs/rohto.png',
          routerLink: '/brand/27',
          vectorImage: 'images/slider vectors/Vector (6).png',
          slideClass: 'slide-5 radial-5',
        },
      ];
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  router = inject(Router);
  navigation(routerLink: string) {
    this.router.navigate([routerLink]);
  }
}
