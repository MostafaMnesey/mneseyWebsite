import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HeroBackgroundComponent } from '../../Snippets/home-snippets/hero_background.component';

@Component({
  selector: 'app-privacy-policy',
  imports: [HeroBackgroundComponent, TranslatePipe],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css',
})
export class PrivacyPolicyComponent {}
