import { Component } from '@angular/core';
import { IaBrainiacsService } from '../../services/ia-brainiacs.service';

@Component({
  selector: 'app-view-ia',
  templateUrl: './view-ia.component.html',
  styleUrls: ['./view-ia.component.css']
})
export class ViewIAComponent {
  isChatOpen = false;
  chatHistory: string[] = [];
  userMessage: string = '';
  isLoading = false;
  currentResponse = '';

  constructor(private iaService: IaBrainiacsService) {}

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      this.chatHistory.push('Brainiacs: ¡Hola! ¿En qué puedo ayudarte?');
    }
  }

  async sendMessage(): Promise<void> {
    if (this.userMessage.trim()) {
      const userInput = this.userMessage;
      this.chatHistory.push(`Tú: ${userInput}`);
      this.userMessage = '';

      this.isLoading = true;
      this.currentResponse = '';

      try {
        const aiResponse = await this.iaService.queryAI(userInput);
        await this.simulateTyping(aiResponse);
        this.chatHistory.push(`Brainiacs: ${this.currentResponse}`);
      } catch (error) {
        this.chatHistory.push('Brainiacs: Lo siento, hubo un problema al procesar tu solicitud.');
      } finally {
        this.isLoading = false;
      }
    }
  }

  async simulateTyping(text: string): Promise<void> {
    this.currentResponse = '';
    const words = text.split(' ');
    for (const word of words) {
      this.currentResponse += (this.currentResponse ? ' ' : '') + word;
      await this.delay(60);
    }
  }

  delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}