import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-hero',
  imports: [TranslatePipe],
  templateUrl: './contact-hero.component.html',
  styleUrl: './contact-hero.component.css',
})
export class ContactHeroComponent {}
