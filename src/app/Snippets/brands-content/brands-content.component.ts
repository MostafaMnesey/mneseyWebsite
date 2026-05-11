import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands-content',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './brands-content.component.html',
  styleUrl: './brands-content.component.css',
})
export class BrandsContentComponent {}
