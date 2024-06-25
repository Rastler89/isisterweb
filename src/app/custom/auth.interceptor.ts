import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { inject } from '@angular/core';



export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  
  if(req.url.indexOf("Login") > 0) return next(req);
  if(req.url.indexOf("oauth") > 0) return next(req);
  

  const token = localStorage.getItem('access_token');

  if(token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse,caught) => {
      if(err instanceof HttpErrorResponse && err.status == 401) {
        auth.renew();
        return next(req.clone())
      }
      return next(req);
    })
  );
};
