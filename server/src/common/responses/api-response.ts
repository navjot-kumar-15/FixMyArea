export class ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;

  constructor(success: boolean, message: string, data: T, statusCode?: number) {
    this.success = success;
    if (statusCode) this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success<T>(
    data: T,
    message: string = 'Operation successful',
    statusCode: number = 200,
  ): ApiResponse<T> {
    
    return new ApiResponse<T>(true, message, data, statusCode);
  }

  static error<T>(
    message: string,
    data: T = null as any,
    statusCode: number = 400,
  ): ApiResponse<T> {
    return new ApiResponse<T>(false, message, data, statusCode);
  }
}
