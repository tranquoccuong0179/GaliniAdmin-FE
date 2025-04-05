export interface PremiumResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface PremiumData {
  id: string;
  Type: string;
  Friend?: number;
  Match?: number;
  Price?: number;
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
