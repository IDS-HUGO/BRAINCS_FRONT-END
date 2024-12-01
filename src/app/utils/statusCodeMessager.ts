export function getStatusCodeMessage(status: number): string {
    switch (status) {
      case 400:
        return 'La solicitud es incorrecta. Verifique los datos ingresados.';
      case 401:
        return 'No está autorizado. Por favor, inicie sesión.';
      case 403:
        return 'No tiene permisos para acceder a este recurso.';
      case 404:
        return 'El recurso solicitado no se encuentra disponible.';
      case 500:
        return 'Hubo un error en el servidor. Inténtelo más tarde.';
      default:
        return 'Ocurrió un error desconocido. Por favor, inténtelo de nuevo.';
    }
  }
  