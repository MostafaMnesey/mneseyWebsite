import { MyTranslateService } from './../core/services/my-translate.service';
import {
  Component,
  OnInit,
  signal,
  inject,
  PLATFORM_ID,
  afterNextRender,
} from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { OptimizedLogoComponent } from '../shared/optimized-logo/optimized-logo.component';
import { NgClass, isPlatformBrowser } from '@angular/common';

// PrimeNG Imports
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, TranslatePipe, ButtonModule, MenuModule, DrawerModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  isScrolled = signal(false);
  menuOpen = signal(false);
  discoverMenuOpen = signal(false);
  dropdownOpen = signal(false);
  currentRoute = signal('');

  languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
  ];

  // PrimeNG Menu Items
  discoverMenuItems: MenuItem[] = [];
  languageMenuItems: MenuItem[] = [];

  constructor(
    private router: Router,
    private translate: TranslateService,
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute.set(event.url);
      });

    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.addEventListener('scroll', () => {
          this.isScrolled.set(window.scrollY > 50);
        });
      }
    });
  }

  MyTranslateService = inject(MyTranslateService);

  ngOnInit() {
    this.initializeMenuItems();

    // Update menu items when language changes
    this.translate.onLangChange.subscribe(() => {
      this.initializeMenuItems();
    });
  }

  private initializeMenuItems() {
    // Initialize discover menu items
    this.discoverMenuItems = [
      {
        label: this.translate.instant('nav.about'),
        command: () => {
          this.navigateAndCloseMenu('/about');
        },
        styleClass:
          'hover:!bg-transparent !w-full !text-center min-[1212px]:!text-left !py-2 !px-4',
      },
      {
        label: this.translate.instant('nav.blogs'),
        command: () => {
          this.navigateAndCloseMenu('/blogs');
        },
        styleClass:
          'hover:!bg-transparent !w-full !text-center min-[1212px]:!text-left !py-2 !px-4',
      },
    ];

    // Initialize language menu items
    this.languageMenuItems = this.languages.map((lang) => ({
      label: lang.name,
      icon: 'pi pi-globe',
      command: () => {
        this.selectLanguage(lang);
      },
      styleClass:
        '!px-4 !py-2 !cursor-pointer !flex !items-center !gap-2 hover:!bg-transparent',
    }));
  }

  toggleMenu() {
    this.menuOpen.update((value) => !value);
  }

  toggleDiscoverMenu(event: Event, menu: any) {
    event.preventDefault();
    menu.toggle(event);
    this.discoverMenuOpen.update((value) => !value);
  }

  toggleLanguageMenu(event: Event, menu: any) {
    event.preventDefault();
    menu.toggle(event);
    this.dropdownOpen.update((value) => !value);
  }

  closeDiscoverMenu() {
    this.discoverMenuOpen.set(false);
  }

  navigateAndToggleMenu(route: string) {
    this.router.navigate([route]);
    // Close mobile sidebar
    this.menuOpen.set(false);
  }

  navigateAndCloseMenu(route: string) {
    this.router.navigate([route]);
    this.closeDiscoverMenu();
  }

  selectLanguage(lang: any) {
    this.MyTranslateService.changeLang(lang.code);
    this.translate.use(lang.code);
    this.dropdownOpen.set(false);
    // Close mobile menu if open
    this.menuOpen.set(false);
    // Reinitialize menu items with new translations
    this.initializeMenuItems();
  }
}
