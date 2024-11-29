export function getStatusCodeMessage(status: number): string {
  switch (status) {
    case 400:
      return 'Solicitud incorrecta. Por favor, verifica los datos e intenta nuevamente.';
    case 401:
      return 'No estás autorizado para realizar esta acción.';
    case 404:
      return 'No se encontró el recurso solicitado.';
    case 500:
      return 'Hubo un error en el servidor, por favor inténtalo más tarde.';
    default:
      return 'Ocurrió un error desconocido.';
  }
}
