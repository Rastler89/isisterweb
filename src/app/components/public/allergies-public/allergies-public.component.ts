import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-allergies-public',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './allergies-public.component.html',
  styleUrl: './allergies-public.component.css'
})
export class AllergiesPublicComponent {
  @Input()  allergies: any;
}
