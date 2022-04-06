import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthorizationMicroservice implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const { service_id } = request.headers;

    if (!service_id || service_id != 'fa3270a2-c045-49f9-8d45-1989ccdf171f')
      response.status(400).json({ message: 'Não autorizado!' });

    next();
  }
}
