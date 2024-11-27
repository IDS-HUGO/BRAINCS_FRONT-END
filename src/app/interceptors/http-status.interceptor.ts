import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { LoaderService } from '../shared/modals/services/loader.service';
import { AlertService } from '../shared/modals/services/alert.service';

@Injectable()
export class HttpStatusInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService, private alertService: AlertService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show(); 

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const status = error.status || 500;
        const message = error.message || 'Ocurrió un error inesperado';
        this.alertService.showError(status, `Error ${status}: ${message}`);
        return throwError(() => new Error(`Error ${status}: ${message}`));
      }),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
