import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../enviroment/enviroment';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private readonly API_KEY = environment.api_IA_Key;
  private readonly API_URL = environment.apiIa;

  constructor(private http: HttpClient) {}

  async generateContent(input: string): Promise<string> {
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.API_KEY}`
      });

      const body = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }],
        max_tokens: 500
      };

      const res = await this.http.post<any>(this.API_URL, body, { headers }).toPromise();
      if (res?.choices?.length > 0) {
        return res.choices[0].message.content;
      }
      throw new Error('No se recibió contenido generado.');
    } catch (error) {
      console.error('Error al hacer la petición:', error);
      throw new Error('Ocurrió un error al procesar la solicitud.');
    }
  }
  
  generatePdf(content: string): { pdfBlob: Blob, pdfUrl: string } {
    if (!content) throw new Error('Contenido no válido para generar el PDF');

    const doc = new jsPDF();
    const margin = 10;
    const maxLineWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const text = doc.splitTextToSize(content, maxLineWidth);
    doc.text(text, margin, margin);

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    return { pdfBlob, pdfUrl };
  }
}