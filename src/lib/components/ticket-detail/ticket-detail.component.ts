import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '@detrasoft.com/detra-ng';
import {
  SUPPORT_CONFIG,
  SUPPORT_USER_SESSION,
  ResolvedSupportConfig,
  SupportUserSession,
} from '../../support.config';
import { SupportService } from '../../services/support.service';
import { Interaction } from '../../models/support.model';

@Component({
  selector: 'ds-support-ticket-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class SupportTicketDetailComponent implements OnInit {
  private readonly supportService = inject(SupportService);
  private readonly config: ResolvedSupportConfig = inject(SUPPORT_CONFIG);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  /** Pode ser null se o app hospedeiro não fornecer via DI. */
  private readonly userSession: SupportUserSession | null =
    inject(SUPPORT_USER_SESSION, { optional: true }) ?? this.config.userSession ?? null;

  readonly interactions = signal<Interaction[]>([]);
  readonly isLoading = signal(true);
  readonly sending = signal(false);
  newMessage = '';

  ticketId: string | null = null;
  currentUserId: string | null = null;

  get labels() {
    return this.config.labels;
  }

  ngOnInit(): void {
    this.currentUserId = this.userSession?.getUserId() ?? null;
    this.ticketId = this.route.snapshot.paramMap.get('ticketId');
    if (this.ticketId) {
      this.loadInteractions();
    }
  }

  loadInteractions(): void {
    if (!this.ticketId) return;
    this.isLoading.set(true);
    this.supportService.getInteractions(this.ticketId).subscribe({
      next: (res) => {
        this.interactions.set(res?.data?.content || res?.content || res || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      },
    });
  }

  sendMessage(): void {
    if (!this.newMessage || this.newMessage.trim().length === 0 || !this.ticketId) {
      return;
    }

    this.sending.set(true);
    const backupMsg = this.newMessage;
    this.newMessage = '';

    this.supportService
      .createInteraction({ ticketId: this.ticketId, body: backupMsg })
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.loadInteractions();
        },
        error: (err) => {
          console.error(err);
          this.newMessage = backupMsg;
          this.sending.set(false);
        },
      });
  }

  isMe(userId: string): boolean {
    return userId === this.currentUserId;
  }

  back(): void {
    this.router.navigateByUrl(this.config.basePath);
  }
}
