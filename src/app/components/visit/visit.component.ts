import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';
import { LoadingComponent } from '../loading/loading.component';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ReactiveFormsModule
  ],
  templateUrl: './visit.component.html',
  styleUrl: './visit.component.css'
})
export class VisitComponent {
  @Input() id!: string;
  @Input() visits: any;

  @Output() update = new EventEmitter<void>();

  @ViewChild('closebutton') closebutton: any;

  visitForm: FormGroup;
  public isLoading: boolean = false;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder,
    private notify: NotificationService
  ) {
    this.visitForm = this.formBuild.group({
      description: [''],
      date: ['']
    })
  }

  addVisit(): void {
    if(this.visitForm.invalid) return;

    this.isLoading = true;

    const object:any = {
      description: this.visitForm.value.description,
      date: this.visitForm.value.date
    }

    this.isister.addVisit(object,this.id).subscribe({
      next:(data:any) => {
        this.closebutton.nativeElement.click();
        this.isLoading = false;
        this.notify.setAlert('Visita añadida','success');
        this.update.emit();
      },
      error:(error) => {
        console.log(error.status);
        this.isLoading = false;
        this.notify.setAlert('No se ha podido añadir','danger');
      }
    })
  }
}
