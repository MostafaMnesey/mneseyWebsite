import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { log } from 'console';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-pages-hero',
  imports: [TranslatePipe],
  templateUrl: './pages-hero.component.html',
  styleUrl: './pages-hero.component.css',
})
export class PagesHeroComponent {
  routeSubscription: any;
  currentRoute: string = '';
  currentLang = signal('');

  constructor(
    private router: Router,
    private mytranslate: MyTranslateService,
  ) {
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        // console.log(this.currentRoute);
      }
      this.mytranslate.lang.subscribe((l: any) => {
        this.currentLang.set(l);
      });
    });
  }

  @Input() bg: string = '';
  @Input() title: string = '';

  // get safeBgUrl(): string {
  //   return `url(assets/${this.bg.replace(/ /g, '%20')})`;
  // }
}
