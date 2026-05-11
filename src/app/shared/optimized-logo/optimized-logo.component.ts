import { Component, input, computed } from '@angular/core';
import { LogoService } from '../../core/services/logo.service';

@Component({
  selector: 'app-optimized-logo',
  standalone: true,
  template: `
    <picture>
      <source [srcset]="logoSrcset()" type="image/webp">
      <img 
        [src]="logoFallback()" 
        [alt]="alt()"
        [width]="width()"
        [height]="height()"
        [class]="cssClass()"
        loading="lazy"
      />
    </picture>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    img {
      max-width: 100%;
      height: auto;
    }
  `]
})
export class OptimizedLogoComponent {
  name = input<string>('');
  width = input<number>(250);
  height = input<number>(0);
  alt = input<string>('Logo');
  cssClass = input<string>('');

  logoSrcset = computed(() => {
    return this.logoService.getLogoSrcset(this.name());
  });

  logoFallback = computed(() => {
    return this.logoService.getLogoFallback(this.name());
  });

  constructor(private logoService: LogoService) {}
}