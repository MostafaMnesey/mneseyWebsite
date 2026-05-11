import { Injectable } from '@angular/core';

export interface LogoConfig {
  name: string;
  baseName: string;
  srcset: string;
  pngFallback: string;
  webpVersions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  private logos: Map<string, LogoConfig> = new Map();

  constructor() {
    // Initialize logo configurations with correct web paths
    this.logos.set('logo.png', {
      name: 'logo.png',
      baseName: 'logo',
      srcset: 'optimized/logos/logo/logo-150w.webp 150w, optimized/logos/logo/logo-200w.webp 200w, optimized/logos/logo/logo-250w.webp 250w, optimized/logos/logo/logo-300w.webp 300w',
      pngFallback: 'optimized/logos/logo/logo.png',
      webpVersions: ["optimized/logos/logo/logo-150w.webp 150w","optimized/logos/logo/logo-200w.webp 200w","optimized/logos/logo/logo-250w.webp 250w","optimized/logos/logo/logo-300w.webp 300w"]
    });
    this.logos.set('logo-white.png', {
      name: 'logo-white.png',
      baseName: 'logo-white',
      srcset: 'optimized/logos/logo-white/logo-white-150w.webp 150w, optimized/logos/logo-white/logo-white-200w.webp 200w, optimized/logos/logo-white/logo-white-250w.webp 250w, optimized/logos/logo-white/logo-white-300w.webp 300w',
      pngFallback: 'optimized/logos/logo-white/logo-white.png',
      webpVersions: ["optimized/logos/logo-white/logo-white-150w.webp 150w","optimized/logos/logo-white/logo-white-200w.webp 200w","optimized/logos/logo-white/logo-white-250w.webp 250w","optimized/logos/logo-white/logo-white-300w.webp 300w"]
    });
    this.logos.set('Group 3287.png', {
      name: 'Group 3287.png',
      baseName: 'Group-3287',
      srcset: 'optimized/logos/Group-3287/Group-3287-200w.webp 200w, optimized/logos/Group-3287/Group-3287-300w.webp 300w, optimized/logos/Group-3287/Group-3287-400w.webp 400w',
      pngFallback: 'optimized/logos/Group-3287/Group-3287.png',
      webpVersions: ["optimized/logos/Group-3287/Group-3287-200w.webp 200w","optimized/logos/Group-3287/Group-3287-300w.webp 300w","optimized/logos/Group-3287/Group-3287-400w.webp 400w"]
    });
    this.logos.set('image001.png.png', {
      name: 'image001.png.png',
      baseName: 'image001.png',
      srcset: 'optimized/logos/image001.png/image001.png-100w.webp 100w, optimized/logos/image001.png/image001.png-150w.webp 150w, optimized/logos/image001.png/image001.png-200w.webp 200w',
      pngFallback: 'optimized/logos/image001.png/image001.png.png',
      webpVersions: ["optimized/logos/image001.png/image001.png-100w.webp 100w","optimized/logos/image001.png/image001.png-150w.webp 150w","optimized/logos/image001.png/image001.png-200w.webp 200w"]
    });
    this.logos.set('image003.jpg.png', {
      name: 'image003.jpg.png',
      baseName: 'image003.jpg',
      srcset: 'optimized/logos/image003.jpg/image003.jpg-100w.webp 100w, optimized/logos/image003.jpg/image003.jpg-150w.webp 150w, optimized/logos/image003.jpg/image003.jpg-200w.webp 200w',
      pngFallback: 'optimized/logos/image003.jpg/image003.jpg.png',
      webpVersions: ["optimized/logos/image003.jpg/image003.jpg-100w.webp 100w","optimized/logos/image003.jpg/image003.jpg-150w.webp 150w","optimized/logos/image003.jpg/image003.jpg-200w.webp 200w"]
    });
    this.logos.set('SAMS-Logo-sm.jpeg.png', {
      name: 'SAMS-Logo-sm.jpeg.png',
      baseName: 'SAMS-Logo-sm.jpeg',
      srcset: 'optimized/logos/SAMS-Logo-sm.jpeg/SAMS-Logo-sm.jpeg-100w.webp 100w, optimized/logos/SAMS-Logo-sm.jpeg/SAMS-Logo-sm.jpeg-150w.webp 150w, optimized/logos/SAMS-Logo-sm.jpeg/SAMS-Logo-sm.jpeg-200w.webp 200w',
      pngFallback: 'optimized/logos/SAMS-Logo-sm.jpeg/SAMS-Logo-sm.jpeg.png',
      webpVersions: ["optimized/logos/SAMS-Logo-sm.jpeg/SAMS-Logo-sm.jpeg-100w.webp 100w","optimized/logos/SAMS-Logo-sm.jpeg/SAMS-Logo-sm.jpeg-150w.webp 150w","optimized/logos/SAMS-Logo-sm.jpeg/SAMS-Logo-sm.jpeg-200w.webp 200w"]
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
    return logo?.pngFallback || '';
  }

  getAllLogos(): LogoConfig[] {
    return Array.from(this.logos.values());
  }
}