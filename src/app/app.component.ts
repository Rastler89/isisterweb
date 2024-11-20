import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './_services/storage.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "./components/menu/menu.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ToastComponent } from './components/toast/toast.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, CommonModule, MenuComponent, FooterComponent, ToastComponent]
})
export class AppComponent {

  public isLogged: boolean = false;

  constructor(
    private storage: StorageService,
    private meta: Meta,
    private title: Title,
  ) {
    this.isLogged = this.storage.isLoggedIn();
  }

  ngOnInit() {
    this.title.setTitle('Isister - Tu mascota, siempre conectada');

    this.meta.addTags([
      { name: 'description', content: 'La plataforma más completa para gestionar la salud y el bienestar de tu mascota. Registra vacunas, dietas, visitas al veterinario y mucho más. Comparte esta información con tus cuidadores y veterinarios de confianza.'},
      { name: 'keywords', content: 'registro de mascotas, salud animal, veterinario, vacunas, alimentación de mascotas'},
      { name: 'og:title', content: 'Isister - Tu mascota, siempre conectada'},
      { name: 'og:description', content: 'La plataforma más completa para gestionar la salud y el bienestar de tu mascota. Registra vacunas, dietas, visitas al veterinario y mucho más. Comparte esta información con tus cuidadores y veterinarios de confianza.'},
      { name: 'og:url', content: 'https://isister.org' },
      { name: 'author', content: 'Daniel Molina'}
    ])
  }
}
