import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vaccine-public',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './vaccine-public.component.html',
  styleUrl: './vaccine-public.component.css'
})
export class VaccinePublicComponent {
  @Input() vaccines: any
}
