import { DrawerModule } from 'primeng/drawer';
import { Component, signal } from '@angular/core';
import { SymptomHeaderComponent } from '../../Snippets/symptom-checker-snippets/symptom-header/symptom-header.component';
import { BodyDiagramComponent } from '../../Snippets/symptom-checker-snippets/body-diagram/body-diagram.component';
import { NgClass } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-symptom-checker',
  templateUrl: './symptom-checker.component.html',
  styleUrls: ['./symptom-checker.component.scss'],
  standalone: true,
  imports: [
    TranslatePipe,
    BodyDiagramComponent,
    RouterLink,
    DrawerModule,
    Button,
  ],
})
export class SymptomCheckerComponent {
  currentLang = signal('');
  visible: boolean = false;

  constructor(
    private translate: TranslateService,
    private mytranslate: MyTranslateService,
  ) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
  }
  selectedAreaId: string | null = null;

  x = [{}];

  onBodyPartSelected(e: any) {
    const targetId = this.getTargetId(e);
    this.showDrawer(targetId);
  }
  getProductSlug(key: string): string {
    return this.translate.instant(`products.${key}.slug`);
  }
  private getTargetId(bodyPart: string): string {
    const mapping = {
      hands: 'handsAndFingers',
      lowerLeg: 'Lowerlegs',
      ankles: 'Ankles',
      hip: 'Hips',
      feet: 'feet',
      back: 'back',
      shoulder: 'neckAndShoulder',
      muscles: 'Muscles',
      thighs: 'thighs',
      knee: 'joints',
    };
    return mapping[bodyPart as keyof typeof mapping] || '';
  }

  showDrawer(targetId: string) {
    this.selectedAreaId = targetId;
    this.visible = true;
  }

  closeDrawer() {
    this.selectedAreaId = null;
    this.visible = false;
  }
}
