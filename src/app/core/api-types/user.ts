export interface CurrentUser {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;
  enabled: boolean;
  credentialsNonExpired: boolean;
  authorities: Authorities[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
}

export interface Authorities {
  authority: string;
}
