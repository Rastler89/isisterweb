import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VisitComponent } from '../visit/visit.component';
import { TreatmentComponent } from '../treatment/treatment.component';
import { SurgeryComponent } from '../surgery/surgery.component';
import { MedicalComponent } from '../medical/medical.component';
import { Pet } from '../../interfaces/Pet';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    VisitComponent,
    TreatmentComponent,
    SurgeryComponent,
    MedicalComponent
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  @Input() id!:string;
  @Input() pet!:Pet;
  @Output() update = new EventEmitter<void>();

  actualizar() {
    this.update.emit();
  }
}
