import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  noindex?: boolean;
}

const SITE_NAME = 'Mentholatum Arabia';
const DOMAIN = 'https://www.mentholatumarabia.com';
const DEFAULT_IMAGE = `${DOMAIN}/images/home-hero.webp`;
const DEFAULT_DESCRIPTION =
  'Mentholatum Arabia — specialists in family healthcare for over 130 years. Explore our trusted range of pain relief, skincare, and wellness products.';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);
  private doc = inject(DOCUMENT);

  /**
   * Call on each navigation end with route-specific config.
   */
  updateSeo(config: SeoConfig): void {
    const fullTitle = `${config.title} | ${SITE_NAME}`;
    const description = config.description || DEFAULT_DESCRIPTION;
    const image = config.image || DEFAULT_IMAGE;
    const url = config.url ? `${DOMAIN}${config.url}` : DOMAIN;
    const type = config.type || 'website';

    // ── Basic ──────────────────────────────────────────────────────────────
    this.title.setTitle(fullTitle);
    this.upsertTag('description', description);
    if (config.keywords) this.upsertTag('keywords', config.keywords);

    // Robots
    const robotsContent = config.noindex ? 'noindex,nofollow' : 'index,follow';
    this.upsertTag('robots', robotsContent);

    // ── Canonical ──────────────────────────────────────────────────────────
    this.setCanonical(url);

    // ── Open Graph ─────────────────────────────────────────────────────────
    this.upsertPropertyTag('og:type', type);
    this.upsertPropertyTag('og:site_name', SITE_NAME);
    this.upsertPropertyTag('og:title', fullTitle);
    this.upsertPropertyTag('og:description', description);
    this.upsertPropertyTag('og:image', image);
    this.upsertPropertyTag('og:image:width', '1200');
    this.upsertPropertyTag('og:image:height', '630');
    this.upsertPropertyTag('og:image:alt', config.title);
    this.upsertPropertyTag('og:url', url);

    // ── Twitter / X Cards ──────────────────────────────────────────────────
    this.upsertTag('twitter:card', 'summary_large_image');
    this.upsertTag('twitter:site', '@mentholatum');
    this.upsertTag('twitter:title', fullTitle);
    this.upsertTag('twitter:description', description);
    this.upsertTag('twitter:image', image);
    this.upsertTag('twitter:image:alt', config.title);
  }

  // ── Private helpers ──────────────────────────────────────────────────────

  private upsertTag(name: string, content: string): void {
    if (this.meta.getTag(`name='${name}'`)) {
      this.meta.updateTag({ name, content });
    } else {
      this.meta.addTag({ name, content });
    }
  }

  private upsertPropertyTag(property: string, content: string): void {
    if (this.meta.getTag(`property='${property}'`)) {
      this.meta.updateTag({ property, content });
    } else {
      this.meta.addTag({ property, content });
    }
  }

  private setCanonical(url: string): void {
    const head = this.doc.head;
    let link: HTMLLinkElement | null = head.querySelector(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
