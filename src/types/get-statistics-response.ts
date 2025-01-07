export interface GetStatisticsResponse {
  success: boolean;
  status: number;
  message: string;
  data: Data;
}

export interface Data {
  subscriber: number;
  qr: number;
  bioBlocks: number;
  domains: number;
  users: number;
  page_views: number;
  revenue: number;
  clicks: number;
  clicks_countries?: any[]; // Replace `any[]` with a more specific type if possible
  clicks_os?: any[]; // Replace `any[]` with a more specific type if possible
  clicks_browsers?: any[]; // Replace `any[]` with a more specific type if possible
}
