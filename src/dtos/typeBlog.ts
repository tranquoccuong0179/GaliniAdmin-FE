export interface BlogResponse {
  status: string;
  message: string;
  data: BlogData;
}

export interface BlogData {
  id: string;
  title: string;
  content: string;
}

export interface BlogRequest {
  title: string;
  content: string;
}
