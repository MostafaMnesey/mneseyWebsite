import { Component } from '@angular/core';
import { HeroBackgroundComponent } from "../../Snippets/home-snippets/hero_background.component";
import { ContactFormComponent } from "../../Snippets/contact-snippets/contact-form/contact-form.component";
import { ContactDataComponent } from "../../Snippets/contact-snippets/contact-data/contact-data.component";

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  imports: [ HeroBackgroundComponent, ContactFormComponent, ContactDataComponent, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {

  



}
