export interface Ticket {
  id: string;
  code: string;
  openedAt: Date;
  closedAt: Date | null;
  priority: string;
  ticketTypeName: string;
  requestDescription: string;
}

export interface Interaction {
  id: string;
  ticketId: string;
  userId: string;
  interactionAt: Date;
  body: string;
  interactionTypeName: string;
}
