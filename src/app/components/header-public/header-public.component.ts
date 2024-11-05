import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-public',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-public.component.html',
  styleUrl: './header-public.component.css'
})
export class HeaderPublicComponent {

}
