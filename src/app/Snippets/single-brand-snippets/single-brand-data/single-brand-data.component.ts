import { NgClass } from '@angular/common';
import { Component, effect, Input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-single-brand-data',
  imports: [RouterLink, SkeletonModule, NgClass, TranslatePipe],
  templateUrl: './single-brand-data.component.html',
  styleUrl: './single-brand-data.component.css',
})
export class SingleBrandDataComponent {
  @Input() brandData: any;
  @Input() id: any;

  selectedTab = signal(0);

  socialMediaLinks = [
    {
      brand: 'Rohto',
      id: 27,
      snapchat: 'https://www.snapchat.com/add/rohtoarabia',
      facebook: 'https://www.facebook.com/RohtoME',
      instagram: 'https://www.instagram.com/rohto_arabia',
      tiktok: 'https://www.tiktok.com/@rohto_arabia',
      youtube: 'https://www.youtube.com/@MentholatumArabia',
    },
    {
      brand: 'Hada Labo',
      id: 26,
      snapchat: 'https://www.snapchat.com/add/hadalaboarabia',
      facebook: 'https://facebook.com/HadaLaboArabia', // Cleaned from redirect
      instagram: 'https://www.instagram.com/hadalaboarabia',
      tiktok: 'https://www.tiktok.com/@hadalaboarabia',
      youtube: 'https://www.youtube.com/@HadaLaboTokyoArabia',
    },
    {
      brand: 'Deep Heat',
      id: 23,
      snapchat: 'https://snapchat.com/t/ByiqWCZn',
      facebook: 'https://www.facebook.com/share/1BDSYqD5RU/?mibextid=wwXIfr',
      instagram: 'https://www.instagram.com/deepheatarabia',
      tiktok: 'https://www.tiktok.com/@deepheatarabia',
      youtube: 'https://www.youtube.com/@MentholatumArabia',
    },
    {
      brand: 'Deep Freeze',
      id: 24,
      snapchat: 'https://snapchat.com/t/LezMqGdI',
      facebook: 'https://www.facebook.com/share/15VoahZGgq/?mibextid=wwXIfr',
      instagram: 'https://www.instagram.com/deepfreezearabia',
      tiktok: 'https://www.tiktok.com/@deepfreezearabia',
      youtube: 'https://www.youtube.com/@MentholatumArabia',
    },
    {
      brand: 'Deep Relief',
      id: 25,
      snapchat: 'https://www.snapchat.com/add/deepreliefme',
      facebook: 'https://www.facebook.com/share/15w5jr97Cy/?mibextid=wwXIfr',
      instagram: 'https://www.instagram.com/deepreliefarabia',
      tiktok: 'https://www.tiktok.com/@deepreliefarabia',
      youtube: 'https://www.youtube.com/@MentholatumArabia',
    },
  ];

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  getRadialBgClass() {
    switch (this.id) {
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
    switch (this.id) {
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
