import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IsisterService } from '../../_services/isister.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-surgery',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ReactiveFormsModule
  ],
  templateUrl: './surgery.component.html',
  styleUrl: './surgery.component.css'
})
export class SurgeryComponent {
  @Input() id!: string;
  @Input() surgeries: any;

  @Output() update = new EventEmitter<void>();

  @ViewChild('closebutton') closebutton: any;

  surgeryForm: FormGroup;
  public types: any;
  private typesId: any;
  public isLoading: boolean = false;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder,
    private notify: NotificationService
  ) {
    this.surgeryForm = this.formBuild.group({
      type: [''],
      date: [''],
      preop: [''],
      description: [''],
      result: [''],
      complications: ['']
    })
  }

  ngOnInit(): void {
    this.isister.getSurgeryTypes().subscribe({
      next:(data:any) => {
        let array: any[] = [];
        data.forEach((type:any) => {
          let name = JSON.parse(type.name);
          type.name = name.es;
          array[name.es] = type.id;
        })
        this.types = data;
        this.typesId = array;
      }, 
      error:(error) => {
        console.log(error.status);
      }
    });
  }

  addSurgery(): void {
    if(this.surgeryForm.invalid) return;

    const object:any = {
      type: this.typesId[this.surgeryForm.value.type],
      date: this.surgeryForm.value.date,
      preop: this.surgeryForm.value.preop,
      description: this.surgeryForm.value.description,
      result: this.surgeryForm.value.result,
      complications: this.surgeryForm.value.complications
    }

    this.isLoading = true;

    this.isister.addSurgery(object,this.id).subscribe({
      next:(object:any) => {
        this.closebutton.nativeElement.click();
        this.isLoading = false;
        this.notify.setAlert('Operación añadida','success');
        this.update.emit();
      },
      error:(error) => {
        this.isLoading = false;
        this.notify.setAlert('No se ha podido añadir','danger');
      }
    })
  }
}
