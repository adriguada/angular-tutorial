import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from './error.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      const message =
        error.error?.message ||
        error.error ||
        'Error inesperado';

      errorService.showError(message);

      return throwError(() => error);
    })
  );
};
