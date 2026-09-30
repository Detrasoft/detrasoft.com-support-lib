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

export type SupportTheme = 'light' | 'dark' | 'glass' | 'auto';

export interface SupportConfig {
  /**
   * URL base do detrasoft-core-api ou do gateway.
   * Ex.: `environment.apiURLDetrasoft`.
   */
  baseUrl: string;

  /**
   * Path da API no gateway.
   * Padrão: `'/detrasoft-core-api'`.
   */
  apiPath?: string;

  /** Rota onde `SUPPORT_ROUTES` foi montada. Padrão: `/support`. */
  basePath?: string;

  /** Rota do botão "voltar". Padrão: `/notes` ou rota de origem. */
  backPath?: string;

  /** Sessão do usuário para identificar mensagens no chat. */
  userSession?: SupportUserSession;

  /** Sobrescrita parcial dos textos. */
  labels?: Partial<SupportLabels>;

  /* ── Theming & Estilos Personalizados ───────────────────────────────── */

  /**
   * Modo visual do módulo de suporte.
   * - `'dark'`: Força tema escuro (ex.: DutFy Notes).
   * - `'light'`: Força tema claro padrão.
   * - `'glass'`: Translucidez e efeito glassmorphic (ex.: Tabfy Forms).
   * - `'auto'`: Detecta automaticamente preferências do sistema ou classes do host.
   */
  theme?: SupportTheme;

  /** Cor de destaque principal (ex.: `#3B82F6` para DutFy Notes, `#D946EF` para Tabfy). */
  brandColor?: string;

  /** Gradiente principal para botões, badges e balões (ex.: `linear-gradient(...)`). */
  brandGradient?: string;

  /** Cor do texto sobre a cor da marca (padrão: `#ffffff`). */
  onBrandColor?: string;

  /** Raio dos cards de chamado e modal (ex.: `'16px'`, `'24px'`). */
  cardRadius?: string;

  /** Cor de fundo dos cards e superfícies (ex.: `#131926` ou `rgba(255,255,255,0.8)`). */
  cardBackground?: string;

  /** Cor ou definição da borda (ex.: `#1E293B` ou `1px solid rgba(...)`). */
  cardBorder?: string;

  /** Sombra dos cards. */
  cardBoxShadow?: string;

  /** Filtro de desfoque para efeito glass (ex.: `'blur(16px)'`). */
  cardBackdropBlur?: string;

  /** Fundo do modal (padrão: herda de cardBackground ou superfícies). */
  modalBackground?: string;

  /** Fundo de campos/áreas rebaixadas (ex.: textarea, inputs). */
  surfaceSunken?: string;

  /** Cor do texto principal. */
  textColor?: string;

  /** Cor do texto atenuado / secundário. */
  textMutedColor?: string;

  /** Se verdadeiro, arredonda botões em formato pill / cápsula. */
  buttonPill?: boolean;

  /** Sombra dos botões principais. */
  buttonBoxShadow?: string;

  /** Classe CSS customizada injetada no container raiz. */
  customClass?: string;
}

export type ResolvedSupportConfig = {
  baseUrl: string;
  apiPath: string;
  basePath: string;
  backPath: string;
  userSession?: SupportUserSession;
  labels: SupportLabels;
  theme: SupportTheme;
  brandColor?: string;
  brandGradient?: string;
  onBrandColor?: string;
  cardRadius?: string;
  cardBackground?: string;
  cardBorder?: string;
  cardBoxShadow?: string;
  cardBackdropBlur?: string;
  modalBackground?: string;
  surfaceSunken?: string;
  textColor?: string;
  textMutedColor?: string;
  buttonPill?: boolean;
  buttonBoxShadow?: string;
  customClass?: string;
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
  let apiPath = config.apiPath ?? '/detrasoft-core-api';
  if (apiPath && !apiPath.startsWith('/')) {
    apiPath = `/${apiPath}`;
  }
  if (apiPath.endsWith('/')) {
    apiPath = apiPath.slice(0, -1);
  }

  return {
    baseUrl: config.baseUrl,
    apiPath,
    basePath: config.basePath ?? '/support',
    backPath: config.backPath ?? '/notes',
    userSession: config.userSession,
    labels: { ...SUPPORT_DEFAULT_LABELS, ...config.labels },
    theme: config.theme ?? 'auto',
    brandColor: config.brandColor,
    brandGradient: config.brandGradient,
    onBrandColor: config.onBrandColor,
    cardRadius: config.cardRadius,
    cardBackground: config.cardBackground,
    cardBorder: config.cardBorder,
    cardBoxShadow: config.cardBoxShadow,
    cardBackdropBlur: config.cardBackdropBlur,
    modalBackground: config.modalBackground,
    surfaceSunken: config.surfaceSunken,
    textColor: config.textColor,
    textMutedColor: config.textMutedColor,
    buttonPill: config.buttonPill,
    buttonBoxShadow: config.buttonBoxShadow,
    customClass: config.customClass,
  };
}

/**
 * Mapeia propriedades do ResolvedSupportConfig para variáveis CSS `--dsp-*`.
 */
export function buildSupportThemeStyles(config: ResolvedSupportConfig): Record<string, string> {
  const styles: Record<string, string> = {};

  if (config.brandColor) {
    styles['--dsp-primary'] = config.brandColor;
    styles['--dsp-primary-strong'] = config.brandColor;
    styles['--dsp-bubble-me-start'] = config.brandColor;
    styles['--dsp-bubble-me-end'] = config.brandColor;
  }
  if (config.brandGradient) {
    styles['--dsp-brand-gradient'] = config.brandGradient;
    styles['--dsp-bubble-me-gradient'] = config.brandGradient;
  }
  if (config.onBrandColor) {
    styles['--dsp-on-primary'] = config.onBrandColor;
  }
  if (config.cardRadius) {
    styles['--dsp-radius-lg'] = config.cardRadius;
  }
  if (config.cardBackground) {
    styles['--dsp-surface'] = config.cardBackground;
    styles['--dsp-modal-bg'] = config.modalBackground ?? config.cardBackground;
  }
  if (config.modalBackground) {
    styles['--dsp-modal-bg'] = config.modalBackground;
  }
  if (config.cardBorder) {
    styles['--dsp-border'] = config.cardBorder;
  }
  if (config.cardBoxShadow) {
    styles['--dsp-shadow'] = config.cardBoxShadow;
  }
  if (config.cardBackdropBlur) {
    styles['--dsp-backdrop-blur'] = config.cardBackdropBlur;
  }
  if (config.surfaceSunken) {
    styles['--dsp-surface-sunken'] = config.surfaceSunken;
    styles['--dsp-input-bg'] = config.surfaceSunken;
  }
  if (config.textColor) {
    styles['--dsp-text'] = config.textColor;
  }
  if (config.textMutedColor) {
    styles['--dsp-text-muted'] = config.textMutedColor;
  }
  if (config.buttonPill !== undefined) {
    styles['--dsp-radius-btn'] = config.buttonPill ? '999px' : (config.cardRadius ?? '12px');
  }
  if (config.buttonBoxShadow) {
    styles['--dsp-button-shadow'] = config.buttonBoxShadow;
  }

  return styles;
}

/**
 * Resolve a classe CSS temática para aplicar no container raiz do suporte.
 */
export function resolveSupportThemeClass(config: ResolvedSupportConfig): string {
  const classes: string[] = [];

  if (config.theme === 'dark') {
    classes.push('dsp-theme-dark');
  } else if (config.theme === 'glass') {
    classes.push('dsp-theme-glass');
  } else if (config.theme === 'light') {
    classes.push('dsp-theme-light');
  }

  if (config.customClass) {
    classes.push(config.customClass);
  }

  return classes.join(' ');
}

/**
 * Registra a `@detrasoft.com/support` no app hospedeiro.
 */
export function provideSupport(config: SupportConfig): Provider {
  return {
    provide: SUPPORT_CONFIG,
    useValue: resolveSupportConfig(config),
  };
}
