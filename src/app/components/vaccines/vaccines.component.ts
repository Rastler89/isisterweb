import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';
import { Pet } from '../../interfaces/Pet';
import { LoadingComponent } from '../loading/loading.component';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-vaccines',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ReactiveFormsModule
  ],
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.css'
})
export class VaccinesComponent {
  @Input() id!: string;
  @Input() vaccines: any | undefined;

  @Output() update = new EventEmitter<void>();

  @ViewChild('closebutton') closebutton: any;

  vaccineForm: FormGroup;

  public isLoading: boolean = false;
  public diseases: any;
  public pet: Pet;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder,
    private notify: NotificationService
  ) {
    this.pet = JSON.parse(localStorage.getItem('Pet')!);

    this.diseases = JSON.parse(localStorage.getItem('enf')!);

    this.vaccineForm = this.formBuild.group({
      name: ['',Validators.required],
      lot: [''],
      application: ['',Validators.required],
      next: [''],
      vcode: ['', Validators.required],
      diseases: this.formBuild.array(
        this.diseases.map(() => 1 == 1)
      )
    })
  }

  addVaccine(): void {
    if(this.vaccineForm.invalid) return;
    let array: any[] = [];

    this.vaccineForm.value.diseases.forEach((x:any,i:any) => {
      if (x) {
        array.push(this.diseases[i].id);
      }
    });

    const object:any = {
      name: this.vaccineForm.value.name,
      lot: this.vaccineForm.value.lot,
      application: this.vaccineForm.value.application,
      next: this.vaccineForm.value.next,
      vcode: this.vaccineForm.value.vcode,
      diseases: array
    }

    this.isister.addVaccine(object, this.id).subscribe({
      next:(object:any) => {
        this.closebutton.nativeElement.click();
        this.notify.setAlert('Vacuna añadida','success');
        this.update.emit();
      },
      error:(error) => {
        console.log(error.status);
      }
    })
  }
}
