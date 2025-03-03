export interface AuthResponse {
  status: string;
  message: string;
  data: AuthData;
}

export interface AuthData {
  token: string;
  accountId: string;
  userName: string;
  roleEnum: string;
  refreshToken: string;
}
