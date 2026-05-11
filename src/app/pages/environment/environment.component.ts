import { Component, signal, ViewEncapsulation } from '@angular/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { BlogsSectionComponent } from "../../Snippets/blogs-section/blogs-section.component";

@Component({
  selector: 'app-environment',
  imports: [BlogsSectionComponent],
  templateUrl: './environment.component.html',
  styleUrl: './environment.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class EnvironmentComponent {
  currentLang = signal('');

  constructor(
    private mytranslate: MyTranslateService,
  ) {
    this.mytranslate.lang.subscribe((l: any) => {
      this.currentLang.set(l);
    });
  }
}
