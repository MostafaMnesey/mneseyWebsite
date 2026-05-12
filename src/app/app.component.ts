import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import translationsAR from '../../public/i18n/ar.json';
import translationsEN from '../../public/i18n/en.json';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { GeoLocationService } from './core/services/geo-location.service';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Mentholatum - Specialists in family healthcare for over 130 years';
  location: { lat: number; lng: number } | null = null;
  error: string | null = null;
  constructor(
    private geo: GeoLocationService,
    private translate: TranslateService,
    private config: PrimeNG,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
  ) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setTranslation('en', translationsEN);
    this.translate.setTranslation('ar', translationsAR);
    this.translate.setDefaultLang('en');
  }
  platformId = inject(PLATFORM_ID);

  ngOnInit() {
    this.primeTranslate(this.translate.getDefaultLang());
    this.setupSeoListener();

    this.geo.getCountry().subscribe({
      next: (res) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('geo', JSON.stringify(res));
        }
      },
    });
  }

  private setupSeoListener() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data),
      )
      .subscribe((data) => {
        const title = data['title'] || 'Mentholatum Arabia';
        const description =
          data['description'] ||
          'Mentholatum - Specialists in family healthcare for over 130 years';
        const keywords = data['keywords'] || 'healthcare, mentholatum, arabia';

        this.seoService.updateSeoTags({
          title,
          description,
          keywords,
          type: 'website',
        });
      });
  }

  public primeTranslate(lang: string) {
    this.translate.use(lang).subscribe({
      next: () => {
        this.translate.get('primeng').subscribe((res) => {
          this.config.setTranslation(res);
        });
      },
      error: (err) => {
        console.error(`Error switching to language ${lang}:`, err);
      },
    });
  }
}
