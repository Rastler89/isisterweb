import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, noop, tap } from 'rxjs';

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.css',
  providers: [{ 
    provide: NG_VALUE_ACCESSOR, 
    useExisting: InputPasswordComponent, 
    multi: true 
  }]

})
export class InputPasswordComponent {
  @Input() label?:string;
  @Output() valueChange = new EventEmitter<string>();
  public isVisible: boolean = false;

  formControl: FormControl = new FormControl<string>('');

  destroyRef: DestroyRef = inject(DestroyRef);

  
  onChange: (value: string) => void = noop;
  onTouch: () => void = noop;

  disabled = false;
  value = '';

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  ngOnInit(): void {
    this.formControl.valueChanges
      .pipe(
        debounceTime(200),
        tap(value => this.onChange(value)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  
  viewPassword() {
    this.isVisible = !this.isVisible;
  }
}
