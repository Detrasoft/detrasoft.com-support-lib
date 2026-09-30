import { InjectionToken, Provider } from '@angular/core';

export interface SupportUserSession {
  getUserId(): string | null;
}

export const SUPPORT_USER_SESSION = new InjectionToken<SupportUserSession>('SUPPORT_USER_SESSION');

export interface SupportLabels {
  listTitle: string;
  listEyebrow: string;
  listDescription: string;
  newTicketBtn: string;
  newTicketModalTitle: string;
  newTicketPlaceholder: string;
  newTicketSubmitBtn: string;
  newTicketCancelBtn: string;
  emptyStateText: string;
  detailTitle: string;
  messagePlaceholder: string;
  sendBtn: string;
  emptyMessagesText: string;
  statusOpen: string;
  statusClosed: string;
  successCreatedMessage: string;
  errorCreatedMessage: string;
  errorLoadMessage: string;
  errorSendMessage: string;
}

export interface SupportConfig {
  /**
   * URL base do detrasoft-core-api.
   * Ex.: `environment.apiURLDetrasoft`.
   */
  baseUrl: string;

  /** Path da API no gateway. Padrão: vazio. */
  apiPath?: string;

  /** Rota onde `SUPPORT_ROUTES` foi montada. Padrão: `/settings/support`. */
  basePath?: string;

  /** Rota do botão "voltar". Padrão: `/settings`. */
  backPath?: string;

  /** Sessão do usuário para identificar mensagens no chat. */
  userSession?: SupportUserSession;

  /** Sobrescrita parcial dos textos. */
  labels?: Partial<SupportLabels>;
}

export type ResolvedSupportConfig = Required<Omit<SupportConfig, 'labels' | 'userSession'>> & {
  labels: SupportLabels;
  userSession?: SupportUserSession;
};

export const SUPPORT_DEFAULT_LABELS: SupportLabels = {
  listTitle: 'Suporte',
  listEyebrow: 'Central de Ajuda',
  listDescription: 'Acompanhe e abra novos chamados.',
  newTicketBtn: 'Novo chamado',
  newTicketModalTitle: 'Novo Chamado',
  newTicketPlaceholder: 'Descreva sua solicitação com detalhes...',
  newTicketSubmitBtn: 'Abrir Chamado',
  newTicketCancelBtn: 'Cancelar',
  emptyStateText: 'Nenhum chamado aberto.',
  detailTitle: 'Chamado',
  messagePlaceholder: 'Digite sua mensagem...',
  sendBtn: 'Enviar',
  emptyMessagesText: 'Nenhuma mensagem ainda.',
  statusOpen: 'ABERTO',
  statusClosed: 'FECHADO',
  successCreatedMessage: 'Chamado aberto com sucesso!',
  errorCreatedMessage: 'Erro ao abrir o chamado.',
  errorLoadMessage: 'Erro ao carregar chamados.',
  errorSendMessage: 'Erro ao enviar mensagem.',
};

export const SUPPORT_CONFIG = new InjectionToken<ResolvedSupportConfig>('SUPPORT_CONFIG');

export function resolveSupportConfig(config: SupportConfig): ResolvedSupportConfig {
  return {
    baseUrl: config.baseUrl,
    apiPath: config.apiPath ?? '',
    basePath: config.basePath ?? '/settings/support',
    backPath: config.backPath ?? '/settings',
    userSession: config.userSession,
    labels: { ...SUPPORT_DEFAULT_LABELS, ...config.labels },
  };
}

/**
 * Registra a `@detrasoft.com/support` no app hospedeiro.
 *
 * ```ts
 * providers: [
 *   provideSupport({
 *     baseUrl: environment.apiURLDetrasoft,
 *     userSession: { getUserId: () => authService.getUserId() },
 *   }),
 * ]
 * ```
 */
export function provideSupport(config: SupportConfig): Provider {
  return {
    provide: SUPPORT_CONFIG,
    useValue: resolveSupportConfig(config),
  };
}
