import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageJwtService } from '../auth/services/local-storage-jwt.service';

export const authGuard = () => {
  const router = inject(Router);
  const storage = inject(LocalStorageJwtService);

  if (!storage.getToken()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
