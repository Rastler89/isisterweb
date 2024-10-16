import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';
import { RouterLink } from '@angular/router';
import { appsettings } from '../../settings/appsettings';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    QRCodeModule
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

  public imagePreviewUrl: string | null = null;
  public urlProfilePublic: string = '';
  public qrCodeDownloadLink: SafeUrl = "";

  constructor(private isister: IsisterService) {
  }

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

    

    this.isister.addImage(this.pet.id,this.imagePreviewUrl).subscribe({
      next:(data) => {

      },
      error:(error) => {
        console.log(error.status);
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
      alert('Copiado!');
    } else {
      alert('No hay nada que copiar');
    }
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

}
