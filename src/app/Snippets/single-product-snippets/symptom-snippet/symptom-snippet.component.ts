import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../../core/services/my-translate.service';

@Component({
  selector: 'app-symptom-snippet',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './symptom-snippet.component.html',
  styleUrl: './symptom-snippet.component.css',
})
export class SymptomSnippetComponent {
  currentLang = signal('');

  constructor(private mytranslate: MyTranslateService) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
  }
}
