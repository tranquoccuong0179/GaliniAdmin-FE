export interface BlogResponse<T> {
  status: string;
  message: string;
  data: T;
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

export interface GetBlogs {
  size: number;
  page: number;
  total: number;
  totalPages: number;
  items: BlogData[];
}
