import { Injectable } from '@angular/core';
export interface VideoOptions {
  quality?: string;
  width?: string;
  height?: string;
  format?: 'mp4' | 'webm' | 'auto';
}

export interface ImageOptions {
  quality?: string;
  width?: string;
  height?: string;
  format?: 'jpg' | 'webp' | 'auto';
}

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private readonly baseUrl = 'https://ebba-mentholatum.imgix.net';

  /**
   * Generate optimized video URL with Imgix
   */
  getOptimizedVideoUrl(filename: string, options: VideoOptions = {}): string {
    const params = new URLSearchParams({
      auto: 'compress,format',
      q: options.quality || '65',
      w: options.width || '1920',
      h: options.height || '1080',
      fit: 'crop',
      crop: 'center',
      fm: options.format || 'hls',
    });

    return `${this.baseUrl}/${filename}?${params}`;
  }

  /**
   * Generate responsive video sources for different screen sizes
   */
  getResponsiveVideoSources(filename: string) {
    return {
      // Desktop - higher quality, larger size
      desktop: this.getOptimizedVideoUrl(filename, {
        quality: '70',
        width: '1920',
        height: '1080',
      }),

      // Tablet - medium quality
      tablet: this.getOptimizedVideoUrl(filename, {
        quality: '60',
        width: '1280',
        height: '720',
      }),

      // Mobile - lower quality, smaller size
      mobile: this.getOptimizedVideoUrl(filename, {
        quality: '50',
        width: '720',
        height: '405',
      }),
    };
  }

  /**
   * Generate optimized poster image URL
   */
  getOptimizedImageUrl(filename: string, options: ImageOptions = {}): string {
    const params = new URLSearchParams({
      auto: 'compress,format',
      q: options.quality || '80',
      w: options.width || '1920',
      h: options.height || '1080',
      fit: 'crop',
      crop: 'center',
      fm: options.format || 'webp',
    });

    return `${this.baseUrl}/${filename}?${params}`;
  }

  /**
   * Generate multiple poster image sources for different pixel densities
   */
  getResponsivePosterSources(filename: string) {
    return {
      '1x': this.getOptimizedImageUrl(filename, {
        quality: '80',
        width: '1920',
      }),
      '2x': this.getOptimizedImageUrl(filename, {
        quality: '75',
        width: '3840',
      }),
    };
  }

  /**
   * Check if device/connection supports video playback
   */
  shouldLoadVideo(): boolean {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }

    // Check connection quality (if available)
    const connection = (navigator as any).connection;
    if (connection) {
      const slowConnections = ['slow-2g', '2g'];
      if (slowConnections.includes(connection.effectiveType)) {
        return false;
      }

      // Check data saver mode
      if (connection.saveData) {
        return false;
      }
    }

    // Check if device has limited memory (if available)
    const memory = (navigator as any).deviceMemory;
    if (memory && memory < 2) {
      return false;
    }

    return true;
  }
}
