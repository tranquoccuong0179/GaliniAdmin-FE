export interface ChartData {
  labels: string[];
  values: number[];
}

export interface Dashboard {
  totalListeners: number;
  totalUsers: number;
  totalBlogs: number;
  totalTransaction: number;
  chart: ChartData;
}

export interface DashboardResponse<T> {
  status: string;
  message: string;
  data: T;
}
