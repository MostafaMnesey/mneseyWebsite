import { Component, signal } from '@angular/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { BlogsSectionComponent } from '../../Snippets/blogs-section/blogs-section.component';
import { HeroComponent } from '../../Snippets/home-snippets/hero/hero.component';
import { AboutSectionComponent } from '../../Snippets/home-snippets/about-section/about-section.component';
import { ProductsSliderComponent } from '../../Snippets/home-snippets/products-slider/products-slider.component';
import { SuitableSliderComponent } from '../../Snippets/home-snippets/suitable-slider/suitable-slider.component';
import { VideosSectionComponent } from '../../Snippets/home-snippets/videos-section/videos-section.component';
import { FeaturesSectionComponent } from '../../Snippets/home-snippets/features-section/features-section.component';
import { GalleriaComponent } from '../../galleria/galleria.component';
import { PagesHeroComponent } from '../../Snippets/pages-hero/pages-hero.component';
import { HeroVideoComponent } from '../../Snippets/home-snippets/hero-video/hero-video.component';
import { HlsHeroVideoComponent } from '../../Snippets/home-snippets/simple_hls_component';
import { HeroBackgroundComponent } from '../../Snippets/home-snippets/hero_background.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [
    BlogsSectionComponent,
    AboutSectionComponent,
    VideosSectionComponent,
    FeaturesSectionComponent,
    TranslatePipe,
    HeroBackgroundComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentLang = signal('');

  constructor(private mytranslate: MyTranslateService) {
    this.mytranslate.lang.subscribe((l) => {
      this.currentLang.set(l);
    });
  }
}
