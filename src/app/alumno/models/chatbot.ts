export interface Chatbot {
    id?: number;         // El ID es opcional (autogenerado por el backend)
    pregunta: string;    // Pregunta realizada por el usuario
    respuesta: string;   // Respuesta del chatbot
    pdf?: string;        // Ruta o referencia a un PDF asociado (opcional)
  }
  