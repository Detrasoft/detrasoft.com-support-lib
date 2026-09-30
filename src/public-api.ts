/*
 * API pública da @detrasoft.com/support
 *
 * Módulo de chamados com tickets e suporte para produtos Detrasoft.
 * Depende do detrasoft-core-api e da @detrasoft.com/detra-ng.
 */

/* ── Configuração / providers ── */
export * from './lib/support.config';

/* ── Rotas ── */
export * from './lib/support.routes';

/* ── Models ── */
export * from './lib/models/support.model';

/* ── Services ── */
export * from './lib/services/support.service';

/* ── Components ── */
export { SupportTicketListComponent } from './lib/components/ticket-list/ticket-list.component';
export { SupportTicketDetailComponent } from './lib/components/ticket-detail/ticket-detail.component';
