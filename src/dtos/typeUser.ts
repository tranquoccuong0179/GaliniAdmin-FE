export interface UserData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface GetUsers {
  size: number;
  page: number;
  total: number;
  totalPages: number;
  items: UserData[];
}

export interface UserResponse<T> {
  status: string;
  message: string;
  data: T;
}
