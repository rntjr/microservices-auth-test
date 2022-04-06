import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const verifyTokenUrl = `http://localhost:3001/verifyToken`;

@Injectable()
export class AuthorizationService implements NestMiddleware {
  constructor(private httpService: HttpService) {}
  async use(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization.split(' ')[1];
    if (!token) throw new BadRequestException('Token not informed!');

    await this.httpService
      .post(
        verifyTokenUrl,
        {},
        { headers: { authorization: `Bearer ${token}` } },
      )
      .forEach((response) => {
        if (!(response.status === 200))
          throw new BadRequestException(response.data.message);
      })
      .catch((err) => {
        throw new BadRequestException(err.response.data);
      });

    next();
  }
}
