import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './_services/storage.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "./components/menu/menu.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ToastComponent } from './components/toast/toast.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, CommonModule, MenuComponent, FooterComponent, ToastComponent]
})
export class AppComponent {

  public isLogged: boolean = false;

  constructor(private storage: StorageService) {
    this.isLogged = this.storage.isLoggedIn();
  }
}
