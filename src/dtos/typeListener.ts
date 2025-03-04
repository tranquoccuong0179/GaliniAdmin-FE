export interface ListenerResponse {
  status: string;
  message: string;
  data: ListenerData;
}

export interface ListenerData {
  id?: string;
  description?: string;
  star?: number;
  price?: number;
  account?: RegisterResponse;
}

export interface RegisterResponse {
  id: string;
  userName?: string;
  password?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  dateOfBirth: string;
  gender: GenderEnum;
  avatarUrl?: string;
  weight: number;
}

export interface CreateListenerInfoModel {
  registerRequest: RegisterUserRequest;
  listenerRequest: CreateListenerInfoRequest;
}

export interface CreateListenerInfoRequest {
  description: string;
  listenerType: ListenerTypeEnum;
  price: number;
}

export interface RegisterUserRequest {
  userName: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: GenderEnum;
  avatarUrl?: string;
  weight: number;
}

export enum ListenerTypeEnum {
  Tarot = "Tarot",
  Share = "Share",
}

export enum GenderEnum {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}
