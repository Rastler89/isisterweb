import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { VetVisitPublicComponent } from '../vet-visit-public/vet-visit-public.component';
import { TreatmentPublicComponent } from '../treatment-public/treatment-public.component';
import { SurgeryPublicComponent } from '../surgery-public/surgery-public.component';
import { MedicalPublicComponent } from '../medical-public/medical-public.component';
import { Pet } from '../../../interfaces/Pet';

@Component({
  selector: 'app-history-public',
  standalone: true,
  imports: [
    CommonModule,
    VetVisitPublicComponent,
    TreatmentPublicComponent,
    SurgeryPublicComponent,
    MedicalPublicComponent
  ],
  templateUrl: './history-public.component.html',
  styleUrl: './history-public.component.css'
})
export class HistoryPublicComponent {
  @Input() pet: Pet | undefined;
}
