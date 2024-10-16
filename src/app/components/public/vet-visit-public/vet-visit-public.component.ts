import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vet-visit-public',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './vet-visit-public.component.html',
  styleUrl: './vet-visit-public.component.css'
})
export class VetVisitPublicComponent {
  @Input() visits: any | undefined;
}
