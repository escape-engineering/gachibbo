export interface TestData {
  error: null;
  data: PointData[];
  count: null;
  status: number;
  statusText: string;
}

export type PointData = { user_point: number };
