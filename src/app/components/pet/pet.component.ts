import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';
import { RouterLink } from '@angular/router';
import { appsettings } from '../../settings/appsettings';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import { LoadingComponent } from "../loading/loading.component";
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    QRCodeModule,
    LoadingComponent
],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent {
  @Input() pet: any;

  public formBuild = inject(FormBuilder);
  public petForm: FormGroup = this.formBuild.group({
    image: ['',Validators.required]
  });

  public isLoading: boolean = false;
  public isLoading2: boolean = false;
  public imageError: boolean = false;

  public imagePreviewUrl: string | null = null;
  public urlProfilePublic: string = '';
  public qrCodeDownloadLink: SafeUrl = "";

  constructor(
    private isister: IsisterService,
    private notify: NotificationService
  ) { }

  ngOnInit() {
    if (this.pet.image != null) {
      this.pet.image = appsettings.apiUrl+'storage/'+this.pet.image;
    }
    if(this.pet.gender == 'F') {
      this.pet.gender = 'Hembra';
    } else {
      this.pet.gender = 'Macho';
    }
    this.calculateAge();
    this.urlProfilePublic = 'https://isister.org/public/pet/'+this.pet.hash;
  }

  onSelectFile(event: Event) {
    if (event.target instanceof HTMLInputElement && event.target.files != null) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviewUrl = e.target.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  enviarImagen() {
    if (this.petForm.invalid) return;
    if (this.imagePreviewUrl == null) return;

    this.isLoading = true;

    this.isister.addImage(this.pet.id,this.imagePreviewUrl).subscribe({
      next:(data) => {
        this.isLoading = false;
        this.notify.setAlert('Imagen subida','success');
      },
      error:(error) => {
        this.isLoading = false;
        this.notify.setAlert('No se ha podido subir','danger');
      }
    });
  }

  calculateAge(): void {
    const today = new Date();
    const millisecondsDiff = today.getTime() - Date.parse(this.pet.birth);
    let years = Math.floor(millisecondsDiff / (1000*60*60*24*365));
    let months = Math.floor((millisecondsDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

    if (years > 1) {
      this.pet.age = years+" años";
    } else if (years = 1) {
      this.pet.age = years+" año";
    } else {
      this.pet.age = months+" meses";
    }
  }

  toClipboard(): void {
    if(this.urlProfilePublic != undefined) {
      navigator.clipboard.writeText(this.urlProfilePublic);
      this.notify.setAlert('Se ha copiado el enlace','success');
    } else {
      this.notify.setAlert('No hay nada para copiar','danger');
    }
  }

  onChangeURL(url: SafeUrl): void {
    this.qrCodeDownloadLink = url;
  }

  onImageError(): void {
    this.imageError = true;
  }

  changeStatus(): void {
    this.isLoading2 = true;
    this.isister.changeState({"value":1},this.pet.id).subscribe({
      next:(data) => {
        this.isLoading2 = false;
        this.notify.setAlert('Dado de alta','success');
        this.pet.status = 1;
      },
      error: (error) => {
        this.isLoading2 = false;
        this.notify.setAlert('Se ha excedido el maximo de mascotas activas','danger');
      }
    })
  }

}
