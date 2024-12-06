import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class IaBrainiacsService {
  private readonly API_KEY = environment.api_IA_Key;
  private readonly API_URL = environment.apiIa;

  constructor(private http: HttpClient) {}

  async queryAI(input: string): Promise<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.API_KEY}`
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }],
      max_tokens: 500
    };

    try {
      const response = await this.http.post<any>(this.API_URL, body, { headers }).toPromise();
      if (response?.choices?.length > 0) {
        return response.choices[0].message.content;
      }
      throw new Error('No se recibió una respuesta de la IA.');
    } catch (error) {
      console.error('Error al consultar la IA:', error);
      throw new Error('Hubo un problema al procesar la consulta.');
    }
  }
}