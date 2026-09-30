import { Routes } from '@angular/router';

/**
 * Rotas de "Suporte / Chamados".
 *
 * ```ts
 * {
 *   path: 'support',
 *   loadChildren: () => import('@detrasoft.com/support').then(m => m.SUPPORT_ROUTES),
 *   data: { title: 'Suporte' },
 * }
 * ```
 */
export const SUPPORT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/ticket-list/ticket-list.component').then(
        m => m.SupportTicketListComponent,
      ),
    data: { title: 'Suporte' },
  },
  {
    path: ':ticketId',
    loadComponent: () =>
      import('./components/ticket-detail/ticket-detail.component').then(
        m => m.SupportTicketDetailComponent,
      ),
    data: { title: 'Chamado' },
  },
];
