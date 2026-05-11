import { Component, signal } from '@angular/core';
import { YouTubePlayer } from '@angular/youtube-player';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MyTranslateService } from '../../../core/services/my-translate.service';
import { CarouselModule } from 'primeng/carousel';
interface VideoCard {
  imgSrc: string;
  videoId: string;
  titleKey: string;
  subtitleKey: string;
  cardIndex: number;
}

@Component({
  selector: 'app-videos-section',
  imports: [
    DialogModule,
    ButtonModule,
    YouTubePlayer,
    TranslatePipe,
    CarouselModule,
  ],
  templateUrl: './videos-section.component.html',
  styleUrl: './videos-section.component.css',
})
export class VideosSectionComponent {
  visible: boolean = false;
  videoSrc: string = '';
  videoTitle: string = '';
  currentLang = signal('');

  videoCards: VideoCard[] = [
    {
      imgSrc: 'images/video_images/rhoto.png',
      videoId: 'DeAeUs2dDPU',
      titleKey: 'home.videosSection.videoCards.card1.title',
      subtitleKey: 'home.videosSection.videoCards.card1.subtitle',
      cardIndex: 1,
    },
    {
      imgSrc: 'images/video_images/deepheat.png',
      videoId: 'bCpiTHkUHqA',
      titleKey: 'home.videosSection.videoCards.card2.title',
      subtitleKey: 'home.videosSection.videoCards.card2.subtitle',
      cardIndex: 2,
    },
    {
      imgSrc: 'images/video_images/deepfreeze.png',
      videoId: 'UTEjKzhJ0i0',
      titleKey: 'home.videosSection.videoCards.card3.title',
      subtitleKey: 'home.videosSection.videoCards.card3.subtitle',
      cardIndex: 3,
    },
  ];

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private translate: TranslateService,
    private mytranslate: MyTranslateService,
  ) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
  }

  showDialog(videoSrc: string, title: string) {
    this.videoSrc = videoSrc;
    this.videoTitle = title;
    this.visible = true;
  }

  showVideoDialog(src: string, cardNumber: number) {
    const translationKey = `home.videosSection.videoCards.card${cardNumber}.title`;
    const translatedTitle = this.translate.instant(translationKey);
    this.showDialog(src, translatedTitle);
  }
}
