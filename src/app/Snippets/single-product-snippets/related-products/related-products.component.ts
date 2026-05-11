import { SkeletonModule } from 'primeng/skeleton';
import { Component, Input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule } from 'primeng/carousel';
import { MyTranslateService } from '../../../core/services/my-translate.service';
import { MainService } from '../../../core/services/main.service';

@Component({
  selector: 'app-related-products',
  imports: [RouterLink, SkeletonModule, TranslatePipe, CarouselModule],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
})
export class RelatedProductsComponent {
  @Input() productDetails: any;
  currentLang = signal('');

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private mytranslate: MyTranslateService,
    private main: MainService,
  ) {
    this.mytranslate.lang.subscribe((l) => {
      this.currentLang.set(l);
    });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  getBrandBgColor() {
    const brandId = this.productDetails?.product?.brand?.id?.toString();
    switch (brandId) {
      case '23':
        return 'bg-[#C2332C]'; // Deep Heat - Red
      case '24':
        return 'bg-[#184A9A]'; // Deep Freeze - Blue
      case '25':
        return 'bg-[#3D1A54]'; // Deep Relief - Purple
      case '26':
        return 'bg-[#E7317A]'; // Hada Labo - Pink
      case '27':
        return 'bg-[#30214E]'; // Rohto - Purple
      default:
        return 'bg-[#C2332C]';
    }
  }

  getCircleBgClass() {
    const brandId = this.productDetails?.product?.brand?.id?.toString();
    switch (brandId) {
      case '23':
        return 'bg-[#FF5F57]'; // Deep Heat
      case '24':
        return 'radial-blue'; // Deep Freeze
      case '25':
        return 'radial-green'; // Deep Relief
      case '26':
        return 'radial-pink'; // Hada Labo
      case '27':
        return 'radial-purple'; // Rohto
      default:
        return 'bg-[#FF5F57]';
    }
  }

  getTitleColorClass() {
    const brandId = this.productDetails?.product?.brand?.id?.toString();
    switch (brandId) {
      case '23':
        return 'text-[#DC3B41]'; // Deep Heat
      case '24':
        return 'text-[#184A9A]'; // Deep Freeze
      case '25':
        return 'text-[#3D1A54]'; // Deep Relief
      case '26':
        return 'text-[#E7317A]'; // Hada Labo
      case '27':
        return 'text-[#30214E]'; // Rohto
      default:
        return 'text-[#DC3B41]';
    }
  }

  getRadialBgClass() {
    const brandId = this.productDetails?.product?.brand?.id?.toString();
    switch (brandId) {
      case '23':
        return 'radial-red'; // Deep Heat
      case '24':
        return 'radial-blue'; // Deep Freeze
      case '25':
        return 'radial-green'; // Deep Relief
      case '26':
        return 'radial-pink'; // Hada Labo
      case '27':
        return 'radial-purple'; // Rohto
      default:
        return 'radial-red';
    }
  }

  getButtonBgClass() {
    const brandId = this.productDetails?.product?.brand?.id?.toString();
    switch (brandId) {
      case '23':
        return 'bg-red-500'; // Deep Heat
      case '24':
        return 'bg-[#184A9A]'; // Deep Freeze
      case '25':
        return 'bg-[#3D1A54]'; // Deep Relief
      case '26':
        return 'bg-[#E7317A]'; // Hada Labo
      case '27':
        return 'bg-[#30214E]'; // Rohto
      default:
        return 'bg-red-500';
    }
  }
}
