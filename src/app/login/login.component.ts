import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../interfaces/Login';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {

  public formBuild = inject(FormBuilder);
  public formLogin: FormGroup = this.formBuild.group({
    email: ['',Validators.required],
    password: ['',Validators.required],

  });
  
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if(this.formLogin.invalid) return;

    const object:Login = {
      username: this.formLogin.value.email,
      password: this.formLogin.value.password
    }

    this.authService.login(object).subscribe({
      next:(data) => {
        if(data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token',data.refresh_token);
          this.router.navigate(['/home']);
        } else {
          alert('Credentials fails');
        }
      },
      error:(error) => {
        console.log(error.message);
      }
    })
  }

  register() {}
}
