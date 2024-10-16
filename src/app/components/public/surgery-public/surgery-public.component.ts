import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-surgery-public',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './surgery-public.component.html',
  styleUrl: './surgery-public.component.css'
})
export class SurgeryPublicComponent {
  @Input() surgeries: any | undefined;
}
