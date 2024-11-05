import { Component } from '@angular/core';
import { HeaderPublicComponent } from "../../components/header-public/header-public.component";
import { FooterPublicComponent } from "../../components/footer-public/footer-public.component";

@Component({
  selector: 'app-privacity',
  standalone: true,
  imports: [HeaderPublicComponent, FooterPublicComponent],
  templateUrl: './privacity.component.html',
  styleUrl: './privacity.component.css'
})
export class PrivacityComponent {

}
