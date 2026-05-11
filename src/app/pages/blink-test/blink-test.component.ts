import {  isPlatformBrowser } from '@angular/common';
import {
  Component,

  PLATFORM_ID,

  inject,
} from '@angular/core';

@Component({
  selector: 'app-blink-test',
  templateUrl: './blink-test.component.html',
  styleUrls: ['./blink-test.component.css'],
  imports: [],
})
export class BlinkTestComponent {
  //   @ViewChild('video', { static: false })
  //   videoRef!: ElementRef<HTMLVideoElement>;
  //   @ViewChild('overlay', { static: false })
  //   overlayRef!: ElementRef<HTMLCanvasElement>;

  //   blinkCount = 0;
  //   testStarted = false;
  //   tracker: any;
  //   animationFrameId: any;
  //   wasBlinking = false;
  //   isBrowser: boolean;

  //   constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  //     this.isBrowser = isPlatformBrowser(platformId);
  //   }

  //   ngOnDestroy() {
  //     cancelAnimationFrame(this.animationFrameId);
  //     this.stopVideo();
  //   }

  //   trackLoop = () => {
  //     const overlay = this.overlayRef.nativeElement;
  //     const context = overlay.getContext('2d');
  //     const positions = this.tracker.getCurrentPosition();

  //     // Debugging: Log positions and overlay size
  //     console.log('Tracker positions:', positions);
  //     console.log('Overlay dimensions:', overlay.width, overlay.height);

  //     if (positions && positions.length > 0) {
  //       overlay.width = this.videoRef.nativeElement.videoWidth;
  //       overlay.height = this.videoRef.nativeElement.videoHeight;

  //       this.tracker.draw(overlay);

  //       const leftEye = positions[23];
  //       const rightEye = positions[28];

  //       if (context) {
  //         context.beginPath();
  //         context.arc(leftEye[0], leftEye[1], 5, 0, Math.PI * 2);
  //         context.fillStyle = 'green';
  //         context.fill();

  //         context.beginPath();
  //         context.arc(rightEye[0], rightEye[1], 5, 0, Math.PI * 2);
  //         context.fillStyle = 'green';
  //         context.fill();
  //       }

  //       const eyeDistance = Math.abs(leftEye[1] - rightEye[1]);
  //       if (eyeDistance > 4) {
  //         console.log('Eyes open, not blinking');
  //       } else {
  //         console.log('Blink detected!');
  //         if (!this.wasBlinking) {
  //           this.blinkCount++;
  //           this.wasBlinking = true;
  //         }
  //       }

  //       setTimeout(() => {
  //         this.wasBlinking = false;
  //       }, 500);
  //     } else {
  //       console.log('No face detected');
  //     }

  //     this.animationFrameId = requestAnimationFrame(this.trackLoop);
  //   };

  //   async startTest() {
  //     if (!this.isBrowser) return;

  //     this.testStarted = true;

  //     try {
  //       const clmModule = await import('clmtrackr');
  //       const clm = clmModule.default;

  //       this.tracker = new clm.tracker();
  //       console.log('Initializing tracker...');
  //       this.tracker.init();

  //       setTimeout(() => {
  //         console.log('Tracker initialized:', this.tracker);
  //         this.startVideo();
  //       }, 500);
  //     } catch (err) {
  //       console.error('Error loading clmtrackr module:', err);
  //     }
  //   }

  //   async startVideo() {
  //     try {
  //       const video = this.videoRef.nativeElement;

  //       const devices = await navigator.mediaDevices.enumerateDevices();
  //       const videoDevices = devices.filter((d) => d.kind === 'videoinput');

  //       const realCamera = videoDevices.find(
  //         (d) => !d.label.toLowerCase().includes('obs'),
  //       );

  //       if (!realCamera) throw new Error('No physical webcam found');

  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: { deviceId: { exact: realCamera.deviceId } },
  //         audio: false,
  //       });

  //       video.srcObject = stream;

  //       video.onloadedmetadata = () => {
  //         console.log('Video loaded metadata');
  //         console.log('Video dimensions:', video.videoWidth, video.videoHeight); // Log video dimensions
  //         video.play();
  //         this.tracker.start(video);

  //         // Set overlay canvas size based on video feed size
  //         this.overlayRef.nativeElement.width = video.videoWidth;
  //         this.overlayRef.nativeElement.height = video.videoHeight;

  //         this.trackLoop();
  //       };
  //     } catch (err: any) {
  //       console.error('Camera error:', err.name, err.message);
  //       alert(`Could not access camera. Reason: ${err.name} - ${err.message}`);
  //     }
  //   }

  //   stopVideo() {
  //     const video = this.videoRef?.nativeElement;
  //     const stream = video?.srcObject as MediaStream;
  //     if (stream) {
  //       stream.getTracks().forEach((track) => track.stop());
  //     }
  //     this.tracker?.stop();
  //   }
  // }
  id = inject(PLATFORM_ID);
  constructor() {
    if (isPlatformBrowser(this.id)) {
      window.open('https://eye-blink-checker.vercel.app/', '_self');
    }
  }
}
