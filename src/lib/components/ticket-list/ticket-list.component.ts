import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent, ConfirmDialogComponent } from '@detrasoft.com/detra-ng';
import {
  SUPPORT_CONFIG,
  ResolvedSupportConfig,
  buildSupportThemeStyles,
  resolveSupportThemeClass,
} from '../../support.config';
import { SupportService } from '../../services/support.service';
import { Ticket } from '../../models/support.model';

@Component({
  selector: 'ds-support-ticket-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
})
export class SupportTicketListComponent implements OnInit {
  private readonly supportService = inject(SupportService);
  private readonly config: ResolvedSupportConfig = inject(SUPPORT_CONFIG);
  private readonly router = inject(Router);

  readonly themeStyles = computed(() => buildSupportThemeStyles(this.config));
  readonly themeClass = computed(() => resolveSupportThemeClass(this.config));

  readonly tickets = signal<Ticket[]>([]);
  readonly isLoading = signal(true);
  readonly isModalOpen = signal(false);
  readonly creating = signal(false);
  newTicketDescription = '';

  get labels() {
    return this.config.labels;
  }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.isLoading.set(true);
    this.supportService.getTickets().subscribe({
      next: (res) => {
        this.tickets.set(res?.data?.content || res?.content || res || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      },
    });
  }

  goToTicket(ticketId: string): void {
    this.router.navigate([this.config.basePath, ticketId]);
  }

  openNewTicketModal(): void {
    this.isModalOpen.set(true);
  }

  closeNewTicketModal(): void {
    this.isModalOpen.set(false);
    this.newTicketDescription = '';
  }

  createTicket(): void {
    if (!this.newTicketDescription || this.newTicketDescription.trim().length === 0) {
      return;
    }

    this.creating.set(true);
    const payload = {
      requestDescription: this.newTicketDescription,
      priority: 'LOW',
    };

    this.supportService.createTicket(payload).subscribe({
      next: () => {
        this.creating.set(false);
        this.closeNewTicketModal();
        this.loadTickets();
      },
      error: (err) => {
        console.error(err);
        this.creating.set(false);
      },
    });
  }

  back(): void {
    this.router.navigateByUrl(this.config.backPath);
  }
}
