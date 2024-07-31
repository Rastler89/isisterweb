import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './visit.component.html',
  styleUrl: './visit.component.css'
})
export class VisitComponent {
  @Input() id!: string;
  @ViewChild('closebutton') closebutton: any;

  visitForm: FormGroup;
  public visits: any;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder
  ) {
    this.visitForm = this.formBuild.group({
      description: [''],
      date: ['']
    })
  }

  ngOnInit(): void {
    this.isister.getVisit(this.id).subscribe({
      next:(object:any) => {
        this.visits = object;
      }
    })
  }

  addVisit(): void {
    if(this.visitForm.invalid) return;

    const object:any = {
      description: this.visitForm.value.description,
      date: this.visitForm.value.date
    }

    this.isister.addVisit(object,this.id).subscribe({
      next:(data:any) => {
        this.closebutton.nativeElement.click();
      },
      error:(error) => {
        console.log(error.status);
      }
    })
  }
}
