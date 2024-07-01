import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
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

  imagePreviewUrl: string | null = null;

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

    
  }
}
