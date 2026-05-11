import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MyTranslateService } from '../../core/services/my-translate.service';
import { HeroBackgroundComponent } from '../../Snippets/home-snippets/hero_background.component';
import { BlogsSectionComponent } from '../../Snippets/blogs-section/blogs-section.component';
import { WhoWeAreComponent } from '../../Snippets/about-snippets/who-we-are/who-we-are.component';
import { HistoryComponent } from '../../Snippets/about-snippets/history/history.component';
import { PhilosophyComponent } from '../../Snippets/about-snippets/philosophy/philosophy.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [
    BlogsSectionComponent,
    HeroBackgroundComponent,
    WhoWeAreComponent,
    HistoryComponent,
    PhilosophyComponent,
    TranslatePipe,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent {
  currentLang = signal('');

  constructor(private mytranslate: MyTranslateService) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
  }
}
