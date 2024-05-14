import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { AsyncPipe, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterRequest } from '../../../../../core/api-types/auth';

@Component({
  selector: 'sp-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInput,
    RouterLink,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  register = output<RegisterRequest>();
  isLoading = input<boolean>();

  validationErrors = '';

  public formGroup = new FormBuilder().group({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]), //adikbarakov123@gmail.com
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onRegister() {
    if (this.formGroup.valid) {
      const data: RegisterRequest = {
        email: this.formGroup.value.email as string,
        username: this.formGroup.value.username as string,
        password: this.formGroup.value.password as string,
      };

      this.register.emit(data);

      this.validationErrors = '';
    } else {
      this.validationErrors = 'Invalid username or password.';
    }
  }
}
