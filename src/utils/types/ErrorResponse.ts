export interface ErrorResponse {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}
