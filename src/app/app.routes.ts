import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './custom/auth.guard';
import { LandingComponent } from './pages/landing/landing.component';
import { publicGuard } from './custom/public.guard';
import { PetComponent } from './pages/pet/pet.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [publicGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [publicGuard]},
    { path: 'home', component: HomeComponent, canActivate: [authGuard]},
    { path: 'pet/:id', component: PetComponent, canActivate: [authGuard]},
    { path: 'landing', component: LandingComponent, canActivate: [publicGuard]},
    { path: '', component: LandingComponent, canActivate: [publicGuard]}
];
