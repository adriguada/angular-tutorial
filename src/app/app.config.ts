import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { LOCALE_ID } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MyDateAdapter } from '../core/date-adapter/MyDateAdapter';
import { ErrorInterceptor } from '../core/error/ErrorInterceptor';
import { inject } from '@angular/core';

const ES_DATE_FORMATS = {
    parse: {
        dateInput: 'yyyy-MM-dd'
    },

    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([ErrorInterceptor])),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: ES_DATE_FORMATS },
    { provide: DateAdapter, useClass: MyDateAdapter },
  ]
};
