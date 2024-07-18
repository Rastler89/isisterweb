import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IsisterService } from '../../_services/isister.service';
import { Pet } from '../../interfaces/Pet';

@Component({
  selector: 'app-vaccines',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './vaccines.component.html',
  styleUrl: './vaccines.component.css'
})
export class VaccinesComponent {
  @Input() id!: string
  @ViewChild('closebutton') closebutton: any;

  vaccineForm: FormGroup;

  public diseases: any;
  public pet: Pet;
  public vaccines: any;

  constructor(
    private isister: IsisterService,
    private formBuild: FormBuilder
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

  ngOnInit(): void {
    this.isister.getVaccines(this.id).subscribe({
      next:(data:any) => {
        data.forEach((obj:any) => {
          let diseases = '';
          obj.disease.forEach((dis:any) => {
            let name = JSON.parse(dis.name);
            diseases = diseases + ' ' + name['es'];
            console.log(dis.name);
          })
          obj.diseases = diseases; 
        })
        this.vaccines = data;
      },
      error:(error) => {
        console.log(error.status);
      }
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
      },
      error:(error) => {
        console.log(error.status);
      }
    })
  }
}
