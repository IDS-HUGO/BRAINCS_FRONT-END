import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private baseUrl = 'https://apibrainiacs.brainiacs.site/chatbot/'; // URL base de la API

  constructor(private http: HttpClient) {}

  createChatbot(pregunta: string, respuesta: string, pdf: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('pregunta', pregunta);
    formData.append('respuesta', respuesta);
    if (pdf) {
      formData.append('pdf', pdf);
    }
    return this.http.post(`${this.baseUrl}/`, formData);
  }

  // Obtener una pregunta/respuesta por ID
  getChatbot(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }
}
