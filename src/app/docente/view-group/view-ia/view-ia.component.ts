import { Component } from '@angular/core';
import { ChatbotService } from '../../../alumno/services/chatbot.service';

@Component({
  selector: 'app-view-ia',
  templateUrl: './view-ia.component.html',
  styleUrl: './view-ia.component.css'
})
export class ViewIAComponent {
   isChatOpen = false;
  chatHistory: string[] = [];
  userMessage: string = '';
  selectedPdf: string | null = null;
  filteredChatbots: { id: number; pregunta: string; respuesta: string; pdf: string | null }[] = [];
  chatbots: { id: number; pregunta: string; respuesta: string; pdf: string | null }[] = [];
  isLoading = false;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    this.chatbotService.getAllChatbots().subscribe(
      (data) => {
        this.chatbots = data;
        this.filteredChatbots = data;
      },
      (error) => {
        console.error('Error al cargar los chatbots:', error);
      }
    );
  }

  handleQuestionClick(chatbot: { id: number; pregunta: string; respuesta: string; pdf: string | null }): void {
    this.chatHistory.push(`Tú: ${chatbot.pregunta}`);
    this.getChatbotResponse(chatbot);
  }

  getChatbotResponse(chatbot: { id: number; pregunta: string; respuesta: string; pdf: string | null }): void {
    this.isLoading = true;
    if (chatbot.respuesta) {
      this.chatHistory.push(`Chatbot: ${chatbot.respuesta}`);
      this.selectedPdf = null;
    } else {
      this.chatHistory.push('Chatbot: No encontré una respuesta para esa pregunta. Aquí tienes una guía:');
      this.selectedPdf = chatbot.pdf || 'ruta_al_pdf.pdf';
    }
    this.isLoading = false;
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      this.chatHistory.push('Chatbot: ¡Hola! ¿En qué puedo ayudarte?');
    }
  }

  sendMessage(): void {
    if (this.userMessage.trim()) {
      const chatbot = this.chatbots.find(c => c.pregunta.toLowerCase().includes(this.userMessage.toLowerCase()));

      if (chatbot) {
        this.chatHistory.push(`Tú: ${this.userMessage}`);
        this.getChatbotResponse(chatbot);
      } else {
        this.chatHistory.push(`Tú: ${this.userMessage}`);
        this.chatHistory.push('Chatbot: No encontré una respuesta. Aquí tienes una guía.');
        this.selectedPdf = 'ruta_al_pdf.pdf'; 
      }

      this.userMessage = ''; 
    }
  }

  searchQuestions(event: any): void {
    const keyword = event.target.value.toLowerCase();
    this.filteredChatbots = this.chatbots.filter(chatbot =>
      chatbot.pregunta.toLowerCase().includes(keyword)
    );
  }

}
