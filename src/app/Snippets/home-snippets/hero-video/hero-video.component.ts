import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { VideoService } from '../../../core/services/video.service';

@Component({
  selector: 'app-hero-video',
  imports: [],
  template: `
    <div class="hero-container">
      <!-- Poster image for SSR and fallback -->
      <img
        [src]="posterImageUrl"
        alt="Hero background"
        class="hero-poster"
        [class.hidden]="videoLoaded && canPlayVideo"
      />

      <!-- Video element -->
      <video
        #heroVideo
        class="hero-video"
        [class.loaded]="videoLoaded"
        muted
        loop
        playsinline
        preload="none"
        [poster]="posterImageUrl"
        (loadeddata)="onVideoLoaded()"
        (canplay)="onCanPlay()"
        (error)="onVideoError($event)"
      >
        <!-- Responsive video sources -->
        <source
          [srcset]="videoSources.desktop"
          media="(min-width: 1024px)"
          type="video/mp4"
        />
        <source
          [srcset]="videoSources.tablet"
          media="(min-width: 768px)"
          type="video/mp4"
        />
        <source [srcset]="videoSources.mobile" type="video/mp4" />
      </video>

      <!-- Content overlay -->
      <div class="hero-content">
        <ng-content></ng-content>
      </div>

      <!-- Loading indicator -->
      @if (!videoLoaded && canPlayVideo) {
        <div class="loading-indicator">
          <div class="spinner"></div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .hero-container {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .hero-video,
      .hero-poster {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 100%;
        min-height: 100%;
        width: auto;
        height: auto;
        object-fit: cover;
        z-index: -1;
      }

      .hero-video {
        opacity: 0;
        transition: opacity 0.8s ease-in-out;
      }

      .hero-video.loaded {
        opacity: 1;
      }

      .hero-poster {
        opacity: 1;
        transition: opacity 0.8s ease-in-out;
      }

      .hero-poster.hidden {
        opacity: 0;
        pointer-events: none;
      }

      .hero-content {
        position: relative;
        z-index: 2;
        text-align: center;
        color: white;
        padding: 2rem;
      }

      .loading-indicator {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
      }

      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s ease-in-out infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      /* Mobile optimizations */
      @media (max-width: 768px) {
        .hero-container {
          height: 70vh; /* Smaller on mobile */
        }
      }

      /* Reduce motion for accessibility */
      @media (prefers-reduced-motion: reduce) {
        .hero-video {
          display: none;
        }
      }

      /* High contrast mode */
      @media (prefers-contrast: high) {
        .hero-content {
          background: rgba(0, 0, 0, 0.8);
          padding: 2rem;
          border-radius: 8px;
        }
      }
    `,
  ],
})
export class HeroVideoComponent {
  @ViewChild('heroVideo') videoElement!: ElementRef<HTMLVideoElement>;

  private platformId = inject(PLATFORM_ID);
  private videoService = inject(VideoService);

  videoSources: any = {};
  posterImageUrl = '';
  videoLoaded = false;
  canPlayVideo = false;
  private intersectionObserver?: IntersectionObserver;

  ngOnInit() {
    // Setup video sources
    this.videoSources = this.videoService.getResponsiveVideoSources(
      'Menthalatum%20100%20years.mp4',
    );

    // Create optimized poster image
    this.posterImageUrl = this.videoService.getOptimizedImageUrl(
      'hero-poster.webp',
      {
        quality: '80',
        width: '1920',
        height: '1080',
      },
    );

    // Only initialize video logic in browser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeVideo();
    }
  }

  private initializeVideo() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    // Check connection quality
    const connection = (navigator as any).connection;
    if (
      connection &&
      (connection.effectiveType === 'slow-2g' ||
        connection.effectiveType === '2g')
    ) {
      return; // Skip video on slow connections
    }

    this.canPlayVideo = true;
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            this.loadVideo();
            this.intersectionObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
  }

  ngAfterViewInit() {
    if (this.intersectionObserver && this.videoElement) {
      this.intersectionObserver.observe(this.videoElement.nativeElement);
    }
  }

  private async loadVideo() {
    const video = this.videoElement.nativeElement;

    // Set the source based on current screen size
    const screenWidth = window.innerWidth;
    let selectedSource: string;

    if (screenWidth >= 1024) {
      selectedSource = this.videoSources.desktop;
    } else if (screenWidth >= 768) {
      selectedSource = this.videoSources.tablet;
    } else {
      selectedSource = this.videoSources.mobile;
    }

    video.src = selectedSource;

    try {
      await video.load();
    } catch (error) {
      console.warn('Video failed to load:', error);
    }
  }

  onVideoLoaded() {
    this.videoLoaded = true;
    const video = this.videoElement.nativeElement;

    // Start playing with user gesture fallback
    video.play().catch(() => {
      // Auto-play failed, video will play on user interaction
      console.log('Auto-play prevented - video will play on user interaction');
    });
  }

  onCanPlay() {
    // Video is ready to play
  }

  onVideoError(event: any) {
    console.error('Video error:', event);
    // Keep showing poster image on error
  }

  ngOnDestroy() {
    this.intersectionObserver?.disconnect();
  }
}
