import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();
    const error = exception.getResponse();
    response.status(statusCode).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      code: response.statusCode,
      message: error['message'],
    });
  }
}
