import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { RegisterRequest } from '../../../../../core/api-types/auth';

@Component({
  selector: 'sp-register-container',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './register-container.component.html',
  styleUrl: './register-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterContainerComponent {
  public isLoading = false;
  onRegister(data: RegisterRequest) {
    // this.authStore.register(data);
  }
}
