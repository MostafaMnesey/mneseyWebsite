import { Component, EventEmitter, Output } from '@angular/core';
import { SymptomHeaderComponent } from '../symptom-header/symptom-header.component';

@Component({
  selector: 'app-body-diagram',
  imports: [SymptomHeaderComponent],
  templateUrl: './body-diagram.component.html',
  styleUrl: './body-diagram.component.css',
})
export class BodyDiagramComponent {
  @Output() bodyPartSelected = new EventEmitter<string>();

  onBodyPartClick(bodyPart: string) {
    this.bodyPartSelected.emit(bodyPart);
  }
}
