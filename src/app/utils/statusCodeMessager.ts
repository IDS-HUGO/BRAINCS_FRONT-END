export const statusCodeMessages: { [key: number]: string } = {
    201: 'Recurso creado correctamente.',
    204: 'Sin contenido.',
    400: 'Solicitud incorrecta. Por favor verifica los datos.',
    401: 'No autorizado. Por favor inicia sesión.',
    403: 'Prohibido. No tienes permiso para acceder a este recurso.',
    404: 'Recurso no encontrado.',
    500: 'Error interno del servidor. Intenta de nuevo más tarde.',
  };
  
  export function getStatusCodeMessage(status: number): string {
    return statusCodeMessages[status] || 'Ocurrió un error desconocido.';
  }
  