import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './custom/auth.guard';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'home', component: HomeComponent, canActivate: [authGuard]},
    { path: 'landing', component: LandingComponent},
    { path: '', component: LandingComponent}
];
