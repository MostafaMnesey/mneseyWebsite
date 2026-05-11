import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-symptom-header',
  imports: [TranslatePipe],
  templateUrl: './symptom-header.component.html',
  styleUrl: './symptom-header.component.css',
})
export class SymptomHeaderComponent {}
