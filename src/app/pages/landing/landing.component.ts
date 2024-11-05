import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderPublicComponent } from '../../components/header-public/header-public.component';
import { FooterPublicComponent } from "../../components/footer-public/footer-public.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterLink,
    HeaderPublicComponent,
    FooterPublicComponent
],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
