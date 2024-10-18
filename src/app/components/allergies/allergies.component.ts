import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';
import { Pet } from '../../interfaces/Pet';
import { LoadingComponent } from '../loading/loading.component';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-allergies',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ReactiveFormsModule
  ],
  templateUrl: './allergies.component.html',
  styleUrl: './allergies.component.css'
})
export class AllergiesComponent {
  @Input() id!: string
  @Input() allergies: any | undefined;

  @Output() update = new EventEmitter<void>();

  @ViewChild('closebutton') closebutton: any;

  allergyForm: FormGroup;

  public pet: Pet;
  public isLoading: boolean = false;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder,
    private notify: NotificationService
  ) {
    this.pet = JSON.parse(localStorage.getItem('Pet')!);

    this.allergyForm = this.formBuild.group({
      name: [''],
      description: ['']
    })
  }

  addAllergy(): void {
    if(this.allergyForm.invalid) return;

    this.isLoading = true; 

    const object:any = {
      name: this.allergyForm.value.name,
      description: this.allergyForm.value.description
    }

    this.isister.addAllergy(object,this.id).subscribe({
      next:(object:any) => {
        this.closebutton.nativeElement.click();
        this.isLoading = false;
        this.notify.setAlert('Alergia añadida','success');
        this.update.emit();
      },
      error:(error) => {
        this.isLoading = false;
        this.notify.setAlert('No se ha podido añadir','danger');
      }
    })
  }
}
