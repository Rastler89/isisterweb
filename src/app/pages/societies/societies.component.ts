import { Component } from '@angular/core';
import { HeaderPublicComponent } from "../../components/header-public/header-public.component";
import { FooterPublicComponent } from "../../components/footer-public/footer-public.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-societies',
  standalone: true,
  imports: [HeaderPublicComponent, FooterPublicComponent, RouterLink],
  templateUrl: './societies.component.html',
  styleUrl: './societies.component.css'
})
export class SocietiesComponent {

}
