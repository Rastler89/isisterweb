import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem("access_token") || "";
  const router = inject(Router);

  if(!token) {
    console.log('nana');
    console.log(token);
    router.navigate(['/login']);
    return false;
  }


  return true;
};
