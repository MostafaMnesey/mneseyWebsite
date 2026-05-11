import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { OptimizedLogoComponent } from '../shared/optimized-logo/optimized-logo.component';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [
    TranslatePipe,
    RouterLink,
    InputTextModule,
    CheckboxModule,
    FormsModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  email: string = '';
  checked: boolean = false;
}
