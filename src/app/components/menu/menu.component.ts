import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(
    private router: Router
  ) {}

  isCurrentRoute(url: string) {
    return this.router.url == url;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/']);
    window.location.reload();
  }
}
