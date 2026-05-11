import { Component, signal } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { MyTranslateService } from '../../../core/services/my-translate.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-philosophy',
  imports: [TimelineModule, TranslatePipe],
  templateUrl: './philosophy.component.html',
  styleUrl: './philosophy.component.css',
})
export class PhilosophyComponent {
  currentLang = signal('');

  constructor(private translateService: MyTranslateService) {
    this.translateService.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
  }

  get events() {
    return [
      {
        h: this.translateService.translate.instant(
          'about.ourPhilosophy.events.supportingSociety.title',
        ),
        icon: 'images/s1.png',
        p: this.translateService.translate.instant(
          'about.ourPhilosophy.events.supportingSociety.description',
        ),
      },
      {
        h: this.translateService.translate.instant(
          'about.ourPhilosophy.events.trustAndRespect.title',
        ),
        icon: 'images/s2.png',
        p: this.translateService.translate.instant(
          'about.ourPhilosophy.events.trustAndRespect.description',
        ),
      },
      {
        h: this.translateService.translate.instant(
          'about.ourPhilosophy.events.happyCustomers.title',
        ),
        icon: 'images/costumer.png',
        p: this.translateService.translate.instant(
          'about.ourPhilosophy.events.happyCustomers.description',
        ),
      },
      {
        h: this.translateService.translate.instant(
          'about.ourPhilosophy.events.ourPeople.title',
        ),
        icon: 'images/social-justice.png',
        p: this.translateService.translate.instant(
          'about.ourPhilosophy.events.ourPeople.description',
        ),
      },
      {
        h: this.translateService.translate.instant(
          'about.ourPhilosophy.events.meaningfulExistence.title',
        ),
        icon: 'images/community 1.png',
        p: this.translateService.translate.instant(
          'about.ourPhilosophy.events.meaningfulExistence.description',
        ),
      },
      {
        h: this.translateService.translate.instant(
          'about.ourPhilosophy.events.continuousImprovement.title',
        ),
        icon: 'images/efficacy 1.png',
        p: this.translateService.translate.instant(
          'about.ourPhilosophy.events.continuousImprovement.description',
        ),
      },
      {
        h: this.translateService.translate.instant(
          'about.ourPhilosophy.events.relentlessPassion.title',
        ),
        icon: 'images/love.png',
        p: this.translateService.translate.instant(
          'about.ourPhilosophy.events.relentlessPassion.description',
        ),
      },
    ];
  }
}
