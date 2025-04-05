export interface PremiumResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface PremiumData {
  id: string;
  type: string;
  friend?: number;
  timelimit?: boolean;
  match?: number;
  price?: number;
}

export interface PremiumRequest {
  Type: string;
  Friend: string;
  Timelimit?: boolean;
  Match?: number;
  Price?: number;
}

export interface GetPremiums {
  size: number;
  page: number;
  total: number;
  totalPages: number;
  items: PremiumData[];
}
