import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatBadge } from '@angular/material/badge';

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbar,
    RouterLink,
    MatButton,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    AsyncPipe,
    NgIf,
    MatBadge,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() start!: MatDrawer;
}
