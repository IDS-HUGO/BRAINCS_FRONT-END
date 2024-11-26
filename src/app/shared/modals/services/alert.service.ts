import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { getStatusCodeMessage } from '../../../utils/statusCodeMessager';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  showSuccess(message: string, title: string = '¡Éxito!') {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: 'Aceptar',
    });
  }

  showError(status: number, title: string = 'Error') {
    const message = getStatusCodeMessage(status);
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: 'Aceptar',
    });
  }

  showWarning(message: string, title: string = 'Advertencia') {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonText: 'Aceptar',
    });
  }

  showInfo(message: string, title: string = 'Información') {
    Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      confirmButtonText: 'Aceptar',
    });
  }
}
