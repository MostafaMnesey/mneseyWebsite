import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  inject,
  afterNextRender,
  input,
  Injector,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Hls from 'hls.js';

@Component({
  selector: 'app-hero-background',
  standalone: true,
  template: `
    <div
      class="hero-container max-h-[50vh] lg:max-h-[70vh]"
      [class.loading]="isLoading && !hasError"
      [style.backgroundImage]="'url(' + bgImage() + ')'"
    >
      <!-- Background Video -->
      @if (hlsUrl()) {
        <video
          #heroVideo
          class="hero-video"
          [class.loaded]="videoLoaded && !hasError"
          muted
          loop
          playsinline
          autoplay
          preload="metadata"
          (loadeddata)="onVideoLoaded()"
          (canplay)="onCanPlay()"
          (error)="onVideoError($event)"
        ></video>
      }

      <!-- Video Overlay -->
      <div class="video-overlay"></div>

      <!-- Hero Content -->
      @if (isHome()) {
        <div
          class="hero-content w-full page-width text-start flex justify-start"
        >
          <ng-content select="h1"></ng-content>
        </div>
      }
      @if (!isHome()) {
        <div
          class="hero-content w-full page-width text-center flex justify-center"
        >
          <ng-content></ng-content>
        </div>
      }

      <!-- Error Message -->
      @if (hasError && hlsUrl()) {
        <div class="fallback-message">
          <p>Video unavailable - showing image instead</p>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .hero-container {
        position: relative;
        width: 100%;
        height: 95vh;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      .hero-container.loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(5px);
        background: rgba(0, 0, 0, 0.3);
        z-index: 4;
      }

      .hero-video {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        min-width: 100%;
        min-height: 100%;
        object-fit: cover;
        z-index: 2;
        opacity: 0;
        transition: opacity 1.5s ease-in-out;
      }

      .hero-video.loaded {
        opacity: 1;
      }

      .video-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 3;
      }

      .hero-content {
        position: relative;
        z-index: 10;
        color: white;
        padding: 3rem 2rem;
        margin: 0 auto;
      }

      .fallback-message {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 5;
        text-align: center;
        color: white;
        background: rgba(255, 0, 0, 0.1);
        padding: 1rem 2rem;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      /* Mobile Optimizations */
      @media (max-width: 768px) {
        .hero-container {
          height: 80vh;
        }

        .hero-content {
          padding: 2rem 1rem;
        }

        .hero-content h1 {
          font-size: 2.5rem;
        }

        .hero-content p {
          font-size: 1.1rem;
        }
      }

      @media (max-width: 480px) {
        .hero-content h1 {
          font-size: 2rem;
        }

        .hero-content p {
          font-size: 1rem;
        }
      }

      /* Accessibility */
      @media (prefers-reduced-motion: reduce) {
        .hero-video {
          display: none;
        }
      }

      /* Performance optimizations */
      .hero-video {
        will-change: opacity;
      }

      .hero-content {
        will-change: transform;
      }
    `,
  ],
})
export class HeroBackgroundComponent implements OnInit, OnDestroy {
  hlsUrl = input('');
  bgImage = input('images/home-hero.webp');
  isHome = input(false);
  injector = inject(Injector);
  @ViewChild('heroVideo') videoElement!: ElementRef<HTMLVideoElement>;

  private platformId = inject(PLATFORM_ID);
  private hls?: Hls;
  private loadTimeout?: any;
  private retryCount = 0;
  private maxRetries = 3;
  private debugMode = false; // Set to true for detailed logging

  // 🔥 Your actual URLs
  // hlsUrl = 'https://cdn.mentholatumarabia.com/videos/hero/master.m3u8';
  // posterUrl = 'https://cdn.mentholatumarabia.com/video/hero/poster.webp';

  // Component state
  videoLoaded = false;
  isLoading = false;
  hasError = false;
  shouldLoadVideo = true;

  constructor() {
    // Single afterNextRender call in constructor to handle initial setup
    afterNextRender(() => {
      if (isPlatformBrowser(this.platformId) && this.shouldLoadVideo) {
        this.log('🎬 Initial setupHlsVideo via afterNextRender');
        this.setupHlsVideo();
      }
    });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkDeviceCapabilities();
    } else {
      this.log('🖥️ Server-side rendering detected - skipping video setup');
      this.shouldLoadVideo = false;
    }
  }

  private log(message: string, ...args: any[]) {
    if (this.debugMode) {
      console.log(`[HeroBackground] ${message}`, ...args);
    }
  }

  private checkDeviceCapabilities() {
    // Always try to load video - only skip on extreme cases
    this.shouldLoadVideo = true;

    // Only skip video on very slow connections
    const connection = (navigator as any).connection;
    if (connection && connection.effectiveType === 'slow-2g') {
      this.shouldLoadVideo = false;
      this.log('⚠️ Skipping video due to very slow connection');
      return;
    }

    // Check device memory (only skip on very low memory devices)
    const memory = (navigator as any).deviceMemory;
    if (memory && memory < 1) {
      this.shouldLoadVideo = false;
      this.log('⚠️ Skipping video due to low device memory');
      return;
    }

    this.log('✅ Device capable of playing video');
  }

  private setupHlsVideo() {
    if (!this.videoElement?.nativeElement) {
      this.log('❌ Video element not found');
      this.handleError();
      return;
    }

    const video = this.videoElement.nativeElement;
    
    // Avoid ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.isLoading = true;
      this.hasError = false;
      this.retryCount = 0;
    }, 0);

    this.log('🚀 Starting HLS video setup...');

    try {
      if (Hls.isSupported()) {
        this.log('✅ HLS.js is supported, using HLS.js');
        // Use HLS.js for browsers that need it
        this.hls = new Hls({
          debug: false,
          enableWorker: true,
          lowLatencyMode: false,
          backBufferLength: 30,
          maxBufferLength: 15,
          maxMaxBufferLength: 30,
          capLevelToPlayerSize: true,
          startLevel: -1, // Auto-select quality
          manifestLoadingTimeOut: 10000,
          manifestLoadingMaxRetry: 2,
          levelLoadingTimeOut: 10000,
          levelLoadingMaxRetry: 2,
        });

        this.log('📡 Loading HLS source:', this.hlsUrl);
        this.hls.loadSource(this.hlsUrl());
        this.hls.attachMedia(video);

        // Handle HLS events
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.log('✅ HLS manifest loaded successfully');
          this.clearLoadTimeout();
        });

        this.hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
          this.log('📊 HLS level loaded:', data.level);
        });

        this.hls.on(Hls.Events.ERROR, (event, data) => {
          this.log('❌ HLS error:', data);
          if (data.fatal) {
            this.handleHlsError(data);
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        this.log('✅ Using native HLS support (Safari)');
        video.src = this.hlsUrl();
        this.clearLoadTimeout();
      } else {
        throw new Error('HLS not supported in this browser');
      }
    } catch (error) {
      this.log('❌ Failed to setup HLS:', error);
      this.handleError();
    }
  }

  private handleHlsError(data: any) {
    if (!this.hls) return;

    this.log('🔍 HLS Error Details:', {
      type: data.type,
      details: data.details,
      fatal: data.fatal,
      url: data.url,
    });

    switch (data.type) {
      case Hls.ErrorTypes.NETWORK_ERROR:
        if (this.retryCount < this.maxRetries) {
          this.log(
            `🔄 Network error, attempting recovery (${this.retryCount + 1}/${this.maxRetries})...`,
          );
          this.retryCount++;
          setTimeout(() => {
            this.hls?.startLoad();
          }, 1000 * this.retryCount); // Exponential backoff
        } else {
          this.log('💥 Max retries reached, falling back to poster');
          this.handleError();
        }
        break;

      case Hls.ErrorTypes.MEDIA_ERROR:
        if (this.retryCount < this.maxRetries) {
          this.log(
            `🔄 Media error, attempting recovery (${this.retryCount + 1}/${this.maxRetries})...`,
          );
          this.retryCount++;
          setTimeout(() => {
            this.hls?.recoverMediaError();
          }, 1000 * this.retryCount); // Exponential backoff
        } else {
          this.log('💥 Max retries reached, falling back to poster');
          this.handleError();
        }
        break;

      default:
        this.log('💥 Fatal error, destroying HLS instance');
        this.handleError();
        break;
    }
  }

  private handleError() {
    this.log('🛑 Handling error - falling back to poster image');
    this.hasError = true;
    this.isLoading = false;
    this.clearLoadTimeout();

    if (this.hls) {
      this.hls.destroy();
      this.hls = undefined;
    }
  }

  private clearLoadTimeout() {
    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout);
      this.loadTimeout = undefined;
    }
  }

  onVideoLoaded() {
    this.log('✅ Video loaded successfully');
    this.videoLoaded = true;
    this.isLoading = false;
    this.clearLoadTimeout();
  }

  onCanPlay() {
    const video = this.videoElement.nativeElement;

    // Ensure video is always muted
    video.muted = true;
    video.volume = 0;

    // Attempt to play
    video
      .play()
      .then(() => {
        this.log('✅ Video started playing (muted)');
      })
      .catch((error) => {
        this.log('⚠️ Autoplay prevented:', error.message);
        // Check if it's an autoplay policy issue
        if (error.name === 'NotAllowedError') {
          this.log(
            '🔇 Autoplay blocked by browser policy - video will play on user interaction',
          );
          // Add a click listener to the container to start playback
          const container = video.closest('.hero-container');
          if (container) {
            const playOnClick = () => {
              video.play().catch((e) => this.log('Still cannot play:', e));
              container.removeEventListener('click', playOnClick);
            };
            container.addEventListener('click', playOnClick, { once: true });
          }
        }
        // Even if autoplay fails, the video will be ready for user interaction
      });
  }

  onVideoError(event: any) {
    this.log('❌ Video error:', event);
    this.handleError();
  }

  ngOnDestroy() {
    this.clearLoadTimeout();

    // Clean up HLS instance
    if (this.hls) {
      this.hls.destroy();
    }
  }
}
