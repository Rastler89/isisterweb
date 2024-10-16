import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-medical-public',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './medical-public.component.html',
  styleUrl: './medical-public.component.css'
})
export class MedicalPublicComponent {
  @Input() medicaltests: any | undefined;
}
