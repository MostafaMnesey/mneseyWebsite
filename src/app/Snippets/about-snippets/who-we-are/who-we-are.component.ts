import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-who-we-are',
  imports: [TranslatePipe],
  templateUrl: './who-we-are.component.html',
  styleUrl: './who-we-are.component.css',
})
export class WhoWeAreComponent {}
