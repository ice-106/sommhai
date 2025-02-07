import { ExtendableError } from 'ts-error';
export class HttpException extends ExtendableError {
  constructor(
    public readonly status: number,
    public readonly message: string,
  ) {
    super(message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}
export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}
export class UnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}
export class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}
export class ConflictException extends HttpException {
  constructor(message: string) {
    super(409, message);
  }
}
export class InternalServerErrorException extends HttpException {
  constructor(
    public error: unknown,
    message = 'Internal Server Error',
  ) {
    super(500, message);
  }
}
export class ServiceUnavailableException extends HttpException {
  constructor(message = 'Service Unavailable') {
    super(503, message);
  }
}
