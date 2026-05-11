import { Component } from '@angular/core';
import { HeroBackgroundComponent } from '../../Snippets/home-snippets/hero_background.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-terms',
  imports: [HeroBackgroundComponent, TranslatePipe],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.css',
})
export class TermsComponent {}
