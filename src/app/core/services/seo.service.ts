import { Injectable, inject, PLATFORM_ID, LOCALE_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

export interface SeoData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  alternateUrls?: { [locale: string]: string };
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private locale = inject(LOCALE_ID);
  private router = inject(Router);

  private readonly baseUrl = 'https://mentholatumarabia.com';
  private readonly supportedLocales = ['ar', 'en'];

  updateSeoTags(seoData: SeoData): void {
    const isArabic = this.locale === 'ar';
    const currentUrl = seoData.url || `${this.baseUrl}${this.router.url}`;

    // Update title
    this.titleService.setTitle(seoData.title);

    // Update meta description
    this.meta.updateTag({ name: 'description', content: seoData.description });

    // Update keywords if provided
    if (seoData.keywords) {
      this.meta.updateTag({ name: 'keywords', content: seoData.keywords });
    }

    // Language and direction meta tags
    this.meta.updateTag({ name: 'language', content: this.locale });
    this.meta.updateTag({
      name: 'direction',
      content: isArabic ? 'rtl' : 'ltr',
    });
    this.meta.updateTag({
      'http-equiv': 'Content-Language',
      content: this.locale,
    });

    // Open Graph tags with i18n
    this.meta.updateTag({ property: 'og:title', content: seoData.title });
    this.meta.updateTag({
      property: 'og:description',
      content: seoData.description,
    });
    this.meta.updateTag({
      property: 'og:type',
      content: seoData.type || 'website',
    });
    this.meta.updateTag({
      property: 'og:locale',
      content: isArabic ? 'ar_SA' : 'en_US',
    });
    this.meta.updateTag({ property: 'og:url', content: currentUrl });

    // Add alternate locales for Open Graph
    if (isArabic) {
      this.meta.updateTag({
        property: 'og:locale:alternate',
        content: 'en_US',
      });
    } else {
      this.meta.updateTag({
        property: 'og:locale:alternate',
        content: 'ar_SA',
      });
    }

    if (seoData.image) {
      this.meta.updateTag({ property: 'og:image', content: seoData.image });
      this.meta.updateTag({ property: 'og:image:width', content: '1200' });
      this.meta.updateTag({ property: 'og:image:height', content: '630' });
      this.meta.updateTag({ property: 'og:image:alt', content: seoData.title });
    }

    // Twitter Card tags
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: seoData.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: seoData.description,
    });

    if (seoData.image) {
      this.meta.updateTag({ name: 'twitter:image', content: seoData.image });
    }

    // Additional SEO meta tags
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'author', content: 'Mentholatum Arabia' });
    this.meta.updateTag({
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    });

    // Geographic targeting
    this.meta.updateTag({ name: 'geo.region', content: 'SA' });
    this.meta.updateTag({ name: 'geo.country', content: 'Saudi Arabia' });

    // Update canonical and hreflang
    this.updateCanonicalUrl(currentUrl);
    this.updateHreflangTags(currentUrl, seoData.alternateUrls);
  }

  updateCanonicalUrl(url: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Remove existing canonical link
    const existingCanonical = this.document.querySelector(
      'link[rel="canonical"]',
    );
    existingCanonical?.remove();

    // Add new canonical link
    const link = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.document.head.appendChild(link);
  }

  updateHreflangTags(
    currentUrl: string,
    alternateUrls?: { [locale: string]: string },
  ): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Remove existing hreflang links
    const existingHreflangs = this.document.querySelectorAll('link[hreflang]');
    existingHreflangs.forEach((link) => link.remove());

    // Generate alternate URLs if not provided
    const generatedAlternates =
      alternateUrls || this.generateAlternateUrls(currentUrl);

    // Add hreflang for each supported locale
    this.supportedLocales.forEach((locale) => {
      if (generatedAlternates[locale]) {
        const link = this.document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', locale);
        link.setAttribute('href', generatedAlternates[locale]);
        this.document.head.appendChild(link);
      }
    });

    // Add x-default for international targeting
    const defaultLink = this.document.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', generatedAlternates['ar'] || currentUrl);
    this.document.head.appendChild(defaultLink);
  }

  private generateAlternateUrls(currentUrl: string): {
    [locale: string]: string;
  } {
    const urlWithoutLocale = currentUrl.replace(/(\/ar\/|\/en\/)/g, '/');

    return {
      ar: urlWithoutLocale
        .replace(this.baseUrl, `${this.baseUrl}/ar`)
        .replace('//', '/'),
      en: urlWithoutLocale
        .replace(this.baseUrl, `${this.baseUrl}/en`)
        .replace('//', '/'),
    };
  }

  updateStructuredData(data: any, id = 'structured-data'): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const scriptId = `structured-data-${id}`;

    // Remove existing structured data with same ID
    const existingScript = this.document.querySelector(
      `script[id="${scriptId}"]`,
    );
    existingScript?.remove();

    // Add new structured data
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.id = scriptId;
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  removeTag(attrSelector: string): void {
    this.meta.removeTag(attrSelector);
  }
}
