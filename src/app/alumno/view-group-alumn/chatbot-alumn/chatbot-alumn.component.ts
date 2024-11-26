import { Component, ViewChild, ElementRef } from '@angular/core';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-chatbot-alumn',
  templateUrl: './chatbot-alumn.component.html',
  styleUrls: ['./chatbot-alumn.component.css'],
})
export class ChatbotAlumnComponent {
  isChatOpen = false; // Controla si el chatbot está abierto
  chatHistory: string[] = []; // Historial de mensajes
  userMessage: string = ''; // Mensaje del usuario
  selectedFile: File | null = null; // Archivo seleccionado
  @ViewChild('fileInput') fileInput!: ElementRef;
  pregunta: string = '';  // Asegúrate de que esta propiedad esté declarada
  respuesta: string = '';
  isLoading = false;

  constructor(private chatbotService: ChatbotService) {}

  // Método para obtener la respuesta del chatbot
  getChatbotResponse(id: number) {
    this.chatbotService.getChatbot(id).subscribe(
      (response) => {
        this.isLoading = false;
        console.log('Respuesta de la API:', response);  // Ver cómo llega la respuesta

        // Asegurarse de que estamos trabajando con un objeto de respuesta válido
        if (response && response.pregunta) {
          const preguntas = response.pregunta.split('|'); // Dividimos las preguntas
          const respuestas = response.respuesta.split('|'); // Dividimos las respuestas
          let respuestaEncontrada = false;

          // Iteramos sobre las preguntas y verificamos si alguna coincide de manera exacta o relevante
          for (let i = 0; i < preguntas.length; i++) {
            const pregunta = preguntas[i].trim();  // Limpiar espacios antes de comparar
            const respuesta = respuestas[i].trim();  // Limpiar espacios antes de mostrar

            // Verificamos si la pregunta del usuario contiene alguna de las preguntas almacenadas
            if (this.isMatchingQuestion(this.userMessage, pregunta)) {
              this.chatHistory.push(`Chatbot: ${respuesta}`); // Mostramos la respuesta si encontramos una coincidencia
              respuestaEncontrada = true;
              break; // Salimos del bucle si encontramos una coincidencia
            }
          }

          // Si no encontramos ninguna respuesta adecuada, mostramos un mensaje indicando que no hay coincidencia
          if (!respuestaEncontrada) {
            this.chatHistory.push('Chatbot: No tengo una respuesta exacta. ¿Quieres ver el PDF relacionado?');
            this.chatHistory.push(`Chatbot: PDF disponible aquí: ${response.pdf}`);  // Muestra el PDF si no hay coincidencia
          }
        } else {
          this.chatHistory.push('Chatbot: No tengo una respuesta para esa pregunta.');
        }
      },
      (error) => {
        this.isLoading = false;
        console.error('Error al obtener la respuesta:', error);
        this.chatHistory.push('Chatbot: Hubo un error al obtener la respuesta.');
      }
    );
  }

  // Función para verificar si la pregunta del usuario contiene alguna de las subpreguntas
  isMatchingQuestion(userMessage: string, subPregunta: string): boolean {
    const cleanedUserMessage = userMessage.trim().toLowerCase();
    const cleanedSubPregunta = subPregunta.trim().toLowerCase();

    // Usamos 'includes' para verificar si la pregunta del usuario contiene la subpregunta
    return cleanedUserMessage.includes(cleanedSubPregunta);
  }

  // Método para enviar un mensaje
  sendMessage() {
    if (this.userMessage.trim()) {
      this.chatHistory.push(`Tú: ${this.userMessage}`);
      const id = 1; // Aquí se establece un id fijo (en este caso, 1) que corresponde al chatbot
      this.getChatbotResponse(id); // Llamamos a la API pasando el id numérico
      this.userMessage = ''; // Limpiar el campo después de enviar el mensaje
    }
  }

  // Método para abrir el chat
  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      this.chatHistory.push('Chatbot: ¡Hola! ¿En qué puedo ayudarte?');
    }
  }

  // Método para abrir el selector de archivo
  triggerFileInput() {
    document.getElementById('fileInput')?.click();
  }

  // Método para manejar la selección de archivo
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }

  // Crear un chatbot con la pregunta y la respuesta (admin)
  createChatbot() {
    if (this.pregunta && this.respuesta) {
      this.chatbotService.createChatbot(this.pregunta, this.respuesta, this.selectedFile).subscribe(
        (response) => {
          console.log('Chatbot creado con éxito:', response);
          this.chatHistory.push('Chatbot: Pregunta y respuesta creadas correctamente.');
        },
        (error) => {
          console.error('Error al crear el chatbot:', error);
          this.chatHistory.push('Chatbot: Error al crear la pregunta y respuesta.');
        }
      );
    }
  }
}
