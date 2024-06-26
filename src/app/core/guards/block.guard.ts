import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {LocalStorageJwtService} from "../../pages/auth/services/local-storage-jwt.service";

export const blockGuard = () => {
  const router = inject(Router);
  const storage = inject(LocalStorageJwtService);

  if (storage.getToken()) {
    router.navigate(['/my']);
    return false;
  }
  return true;
};
