import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-single-brand-hero',
  imports: [SkeletonModule],
  templateUrl: './single-brand-hero.component.html',
  styleUrl: './single-brand-hero.component.css',
})
export class SingleBrandHeroComponent {
  @Input() id: any;
  @Input() brandData: any;

  getBrandBgColor() {
    switch (this.id ?? '') {
      case '23':
        return 'bg-[linear-gradient(180deg,_#C2332C_0%,_#FFF_60.5%)]'; // Deep Heat - Red
      case '24':
        return 'bg-[linear-gradient(180deg,_#0067B1_0%,_#FFF_60.5%)]'; // Deep Freeze - Blue
      case '25':
        return 'bg-[linear-gradient(180deg,_#3D1A54_0%,_#FFF_60.5%)]'; // Deep Relief - Purple
      case '26':
        return 'bg-[linear-gradient(180deg,_#E7317A_0%,_#FFF_60.5%)]'; // Hada Labo - Pink
      case '27':
        return 'bg-[linear-gradient(180deg,_#30214E_0%,_#FFF_60.5%)]'; // Rohto - Purple
      default:
        return 'bg-[linear-gradient(180deg,_#C2332C_0%,_#FFF_60.5%)]';
    }
  }

  getCircleBgClass() {
    switch (this.id) {
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
    switch (this.id) {
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
}
