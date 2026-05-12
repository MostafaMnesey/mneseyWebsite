import { Injectable } from '@angular/core';

export interface LogoConfig {
  name: string;
  baseName: string;
  srcset: string;
  webpFallback: string;
  webpVersions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  private logos: Map<string, LogoConfig> = new Map();

  constructor() {
    // Initialize logo configurations with correct web paths
    this.logos.set('logo.webp', {
      name: 'logo.webp',
      baseName: 'logo',
      srcset: 'optimized/logos/logo/logo-150w.webp 150w, optimized/logos/logo/logo-200w.webp 200w, optimized/logos/logo/logo-250w.webp 250w, optimized/logos/logo/logo-300w.webp 300w',
      webpFallback: 'optimized/logos/logo/logo.webp',
      webpVersions: ["optimized/logos/logo/logo-150w.webp 150w","optimized/logos/logo/logo-200w.webp 200w","optimized/logos/logo/logo-250w.webp 250w","optimized/logos/logo/logo-300w.webp 300w"]
    });
    this.logos.set('logo-white.webp', {
      name: 'logo-white.webp',
      baseName: 'logo-white',
      srcset: 'optimized/logos/logo-white/logo-white-150w.webp 150w, optimized/logos/logo-white/logo-white-200w.webp 200w, optimized/logos/logo-white/logo-white-250w.webp 250w, optimized/logos/logo-white/logo-white-300w.webp 300w',
      webpFallback: 'optimized/logos/logo-white/logo-white.webp',
      webpVersions: ["optimized/logos/logo-white/logo-white-150w.webp 150w","optimized/logos/logo-white/logo-white-200w.webp 200w","optimized/logos/logo-white/logo-white-250w.webp 250w","optimized/logos/logo-white/logo-white-300w.webp 300w"]
    });
    this.logos.set('Group 3287.webp', {
      name: 'Group 3287.webp',
      baseName: 'Group-3287',
      srcset: 'optimized/logos/Group-3287/Group-3287-200w.webp 200w, optimized/logos/Group-3287/Group-3287-300w.webp 300w, optimized/logos/Group-3287/Group-3287-400w.webp 400w',
      webpFallback: 'optimized/logos/Group-3287/Group-3287.webp',
      webpVersions: ["optimized/logos/Group-3287/Group-3287-200w.webp 200w","optimized/logos/Group-3287/Group-3287-300w.webp 300w","optimized/logos/Group-3287/Group-3287-400w.webp 400w"]
    });
    this.logos.set('image001.webp.webp', {
      name: 'image001.webp.webp',
      baseName: 'image001.webp',
      srcset: 'optimized/logos/image001.webp/image001.webp-100w.webp 100w, optimized/logos/image001.webp/image001.webp-150w.webp 150w, optimized/logos/image001.webp/image001.webp-200w.webp 200w',
      webpFallback: 'optimized/logos/image001.webp/image001.webp.webp',
      webpVersions: ["optimized/logos/image001.webp/image001.webp-100w.webp 100w","optimized/logos/image001.webp/image001.webp-150w.webp 150w","optimized/logos/image001.webp/image001.webp-200w.webp 200w"]
    });
    this.logos.set('image003.webp.webp', {
      name: 'image003.webp.webp',
      baseName: 'image003.webp',
      srcset: 'optimized/logos/image003.webp/image003.webp-100w.webp 100w, optimized/logos/image003.webp/image003.webp-150w.webp 150w, optimized/logos/image003.webp/image003.webp-200w.webp 200w',
      webpFallback: 'optimized/logos/image003.webp/image003.webp.webp',
      webpVersions: ["optimized/logos/image003.webp/image003.webp-100w.webp 100w","optimized/logos/image003.webp/image003.webp-150w.webp 150w","optimized/logos/image003.webp/image003.webp-200w.webp 200w"]
    });
    this.logos.set('SAMS-Logo-sm.webp.webp', {
      name: 'SAMS-Logo-sm.webp.webp',
      baseName: 'SAMS-Logo-sm.webp',
      srcset: 'optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp-100w.webp 100w, optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp-150w.webp 150w, optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp-200w.webp 200w',
      webpFallback: 'optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp.webp',
      webpVersions: ["optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp-100w.webp 100w","optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp-150w.webp 150w","optimized/logos/SAMS-Logo-sm.webp/SAMS-Logo-sm.webp-200w.webp 200w"]
    });
  }

  getLogo(name: string): LogoConfig | undefined {
    return this.logos.get(name);
  }

  getLogoSrcset(name: string): string {
    const logo = this.logos.get(name);
    return logo?.srcset || '';
  }

  getLogoFallback(name: string): string {
    const logo = this.logos.get(name);
    return logo?.webpFallback || '';
  }

  getAllLogos(): LogoConfig[] {
    return Array.from(this.logos.values());
  }
}