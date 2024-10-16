import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-treatment-public',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './treatment-public.component.html',
  styleUrl: './treatment-public.component.css'
})
export class TreatmentPublicComponent {
  @Input() treatments: any;
}
