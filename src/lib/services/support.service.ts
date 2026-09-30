import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SUPPORT_CONFIG, ResolvedSupportConfig } from '../support.config';
import { Ticket, Interaction } from '../models/support.model';

/**
 * Serviço de integração com a API de suporte (detrasoft-core-api).
 *
 * Desacoplado de `environment.ts` e `FrameworkService` — usa HttpClient e SUPPORT_CONFIG via DI.
 */
@Injectable({
  providedIn: 'root',
})
export class SupportService {
  private readonly http = inject(HttpClient);
  private readonly config: ResolvedSupportConfig = inject(SUPPORT_CONFIG);

  private get apiUrl(): string {
    const base = this.config.baseUrl.endsWith('/')
      ? this.config.baseUrl.slice(0, -1)
      : this.config.baseUrl;
    const path = this.config.apiPath
      ? (this.config.apiPath.startsWith('/') ? this.config.apiPath : `/${this.config.apiPath}`)
      : '';
    return `${base}${path}`;
  }

  getTickets(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/ticket`);
  }

  createTicket(ticket: { requestDescription: string; priority: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tickets`, ticket);
  }

  getInteractions(ticketId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/interaction?ticketId=${ticketId}`);
  }

  createInteraction(interaction: { ticketId: string; body: string; interactionTypeId?: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/interaction`, interaction);
  }
}
