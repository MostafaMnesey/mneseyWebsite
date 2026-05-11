import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Hls from 'hls.js'; // Import directly from package

@Component({
  selector: 'app-hls-hero-video',
  standalone: true,
  template: `
    <div class="hero-container">
      <!-- Poster image -->
      <img
        [src]="posterUrl"
        alt="Hero background"
        class="hero-poster"
        [class.hidden]="videoLoaded"
      />

      <!-- Video element -->
      <video
        #heroVideo
        class="hero-video"
        [class.loaded]="videoLoaded"
        muted
        loop
        playsinline
        autoplay
        (loadeddata)="onVideoLoaded()"
        (error)="onVideoError($event)"
      ></video>

      <!-- Your content here -->
      <div class="hero-content">
        <ng-content></ng-content>
      </div>

      <!-- Loading indicator -->
      @if (isLoading) {
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
        background: #000;
      }

      .hero-video,
      .hero-poster {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 1;
      }

      .hero-video {
        opacity: 0;
        transition: opacity 1s ease;
      }

      .hero-video.loaded {
        opacity: 1;
        z-index: 2;
      }

      .hero-poster.hidden {
        opacity: 0;
      }

      .hero-content {
        position: relative;
        z-index: 10;
        text-align: center;
        color: white;
        padding: 2rem;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 12px;
        backdrop-filter: blur(10px);
      }

      .loading-indicator {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 5;
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

      @media (max-width: 768px) {
        .hero-container {
          height: 70vh;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .hero-video {
          display: none;
        }
      }
    `,
  ],
})
export class HlsHeroVideoComponent implements OnInit, OnDestroy {
  @ViewChild('heroVideo') videoElement!: ElementRef<HTMLVideoElement>;

  private platformId = inject(PLATFORM_ID);
  private hls?: Hls;

  // 🔥 Change these to your R2 URLs
  hlsUrl = 'https://cdn.mentholatumarabia.com/videos/hero/master.m3u8';
  posterUrl = '/images/hero.jpg';

  videoLoaded = false;
  isLoading = false;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadVideo();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setupVideo();
    }
  }

  private setupVideo() {
    if (!this.videoElement?.nativeElement) return;

    const video = this.videoElement.nativeElement;

    // Check if HLS is supported
    if (Hls.isSupported()) {
      // Use HLS.js for browsers that need it
      this.hls = new Hls({
        debug: false,
        enableWorker: true,
        lowLatencyMode: false,
        backBufferLength: 90,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
      });

      this.hls.loadSource(this.hlsUrl);
      this.hls.attachMedia(video);

      // Handle HLS events
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('HLS manifest loaded, starting playback');
      });

      this.hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS error:', data);
        if (data.fatal) {
          this.handleHlsError(data);
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = this.hlsUrl;
    } else {
      console.error('HLS not supported in this browser');
    }
  }

  private handleHlsError(data: any) {
    if (!this.hls) return;

    switch (data.type) {
      case Hls.ErrorTypes.NETWORK_ERROR:
        console.log('Network error, attempting recovery...');
        this.hls.startLoad();
        break;

      case Hls.ErrorTypes.MEDIA_ERROR:
        console.log('Media error, attempting recovery...');
        this.hls.recoverMediaError();
        break;

      default:
        console.log('Fatal error, destroying HLS instance');
        this.hls.destroy();
        break;
    }
  }

  private loadVideo() {
    this.isLoading = true;
  }

  onVideoLoaded() {
    this.videoLoaded = true;
    this.isLoading = false;

    const video = this.videoElement.nativeElement;

    // Try to play (autoplay might be blocked)
    video.play().catch((error) => {
      console.log('Autoplay was prevented:', error);
      // Video will play when user interacts with page
    });
  }

  onVideoError(event: any) {
    console.error('Video error:', event);
    this.isLoading = false;
  }

  ngOnDestroy() {
    if (this.hls) {
      this.hls.destroy();
    }
  }
}
