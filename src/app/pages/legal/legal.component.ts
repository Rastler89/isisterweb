import { Component } from '@angular/core';
import { HeaderPublicComponent } from '../../components/header-public/header-public.component';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [
    HeaderPublicComponent
  ],
  templateUrl: './legal.component.html',
  styleUrl: './legal.component.css'
})
export class LegalComponent {

}
