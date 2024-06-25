import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const publicGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem("access_token") || "";
  const router = inject(Router);

  if(token) {
    router.navigate(['/home']);
    return false;
  }


  return true;
};
