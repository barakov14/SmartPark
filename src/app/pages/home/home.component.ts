import {ChangeDetectionStrategy, Component} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { HeaderComponent } from '../../core/layout/header/header.component';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { NavbarComponent } from '../../core/layout/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { MapsContainerComponent } from '../../feature/maps/components/maps-container/maps-container.component';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatButton,
    HeaderComponent,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    NavbarComponent,
    RouterOutlet,
    MapsContainerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {}
